"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { KanjiData, PhoneticSemanticData } from "@/types";
import { isJoyo } from "@/utils/joyo";
import {
    Box,
    Divider,
    Grid,
    GridItem,
    HStack,
    Heading,
    Input,
    Stack,
    Switch,
    Text,
} from "@chakra-ui/react";
import { groupBy, values } from "lodash";
import { Fragment, useMemo, useState } from "react";
import { KanjiDisplay } from "../common/KanjiText";
import { ItemDetails } from "./ItemDetails";

export const AllViewer = (props: {
  data: PhoneticSemanticData[];
  kanjiData?: Record<string, { part: string[], kanjis: KanjiData[] }[]>;
  hideSearch?: boolean;
  showDetails?: boolean;
}) => {
  const { data, hideSearch = true, showDetails = false, kanjiData } = props;
  const [joyo, setJoyo] = useLocalStorage("showJoyo", true);
  const [filter, setFilter] = useState("");
  const groups = useMemo(
    () =>
      values(
        groupBy(
          joyo
            ? data
                .map((d) => ({
                  ...d,
                  kanjis: d.kanjis.filter((d) => isJoyo(d.kanji[0])),
                }))
                .filter((d) => d.kanjis.length > 0)
            : data,
          (d) => d.pronounciation
        )
      ),
    [data, joyo]
  );

  return (
    <Stack>
      <HStack>
        <Switch isChecked={joyo ?? true} onChange={(e) => setJoyo(e.target.checked)} />
        <Text>Show Joyo Only</Text>
      </HStack>
      <Divider />
      {!hideSearch && (
        <Input
          w="full"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      )}
      <Grid templateColumns="80px 1fr" gap={6}>
        {groups.map((g) => {
          return (
            <Fragment key={g[0].pronounciation}>
              <GridItem h="full">
                <HStack w="full">
                  <Heading>{g[0].pronounciation}</Heading>
                  <Divider orientation="vertical" width="1px" />
                </HStack>
              </GridItem>
              <GridItem>
                {
                    showDetails ? 
                        <Stack>
                             {g
                            .filter((d) => !!d.part[0])
                            .map((d, idx) => (
                                <Box
                                    key={d.part[0].kanji}
                                    p={2}
                                    shadow="md"
                                >
                                    <ItemDetails data={d} kanjiData={kanjiData?.[g[0].pronounciation].find(p => p.part.includes(d.part[0].kanji))?.kanjis} />
                                </Box>
                            ))}
                        </Stack>
                    : (
                        <HStack spacing={6} mb={6} flexWrap="wrap">
                        {g
                            .filter((d) => !!d.part[0])
                            .map((d, idx) => (
                            <Box
                                key={d.part[0].kanji}
                                shadow="md"
                                boxSize={16}
                                p={2}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <KanjiDisplay data={d.part[0]} />
                            </Box>
                            ))}
                        </HStack>
                    )
                }
              </GridItem>
            </Fragment>
          );
        })}
      </Grid>
    </Stack>
  );
};
