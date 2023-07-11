"use client";
import { KANA_COLUMNS } from "@/data/gojuuon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { KanjiData, PhoneticSemanticData } from "@/types";
import { getPath } from "@/utils/getPath";
import { isJoyo } from "@/utils/joyo";
import { Link } from "@chakra-ui/next-js";
import {
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Hide,
  Input,
  Show,
  Stack,
  Switch,
  Text
} from "@chakra-ui/react";
import { groupBy, values } from "lodash";
import { Fragment, useMemo, useState } from "react";
import { KanjiDisplay } from "../common/KanjiText";
import { ItemDetails } from "./ItemDetails";

export const AllViewer = (props: {
  data: PhoneticSemanticData[];
  kanjiData?: Record<string, { part: string[]; kanjis: KanjiData[] }[]>;
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
          (d) => d.pronunciation
        )
      ),
    [data, joyo]
  );

  return (
    <Stack>
      <HStack>
        <Switch
          isChecked={joyo ?? true}
          onChange={(e) => setJoyo(e.target.checked)}
        />
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
      <Grid templateColumns={["1fr", null, "80px 1fr"]} gap={6} w="full">
        {groups.map((g) => {
          return (
            <Fragment key={g[0].pronunciation}>
              <GridItem h="full">
                <Stack direction={["column", null, "row"]} h="full" alignItems="flex-start">
                  <Heading flex="1">{g[0].pronunciation}</Heading>
                  <Show above="md">
                    <Divider orientation="vertical"/>
                  </Show>
                  <Hide above="md">
                    <Divider orientation="horizontal"/>
                  </Hide>
                </Stack>
              </GridItem>
              <GridItem  width="full">
                {showDetails ? (
                  <Stack>
                    {g
                      .filter((d) => d.part[0]?.kanji)
                      .map((d, idx) => (
                        <Fragment key={d.part[0].kanji}>
                          <ItemDetails
                              data={d}
                              kanjiData={
                                kanjiData?.[g[0].pronunciation].find((p) =>
                                  p.part.includes(d.part[0].kanji)
                                )?.kanjis
                              }
                            />
                          <Divider />
                        </Fragment>
                      ))}
                  </Stack>
                ) : (
                  <HStack spacing={6} mb={6} flexWrap="wrap">
                    {g
                      .filter((d) => d.part[0]?.kanji)
                      .map((d, idx) => (
                        <Link 
                        key={d.part[0].kanji}
                        shadow="md"
                        boxSize={16}
                        p={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        href={getPath(`/browse/${KANA_COLUMNS.findIndex(s => s.includes(d.pronunciation?.[0]))}#${d.part[0].kanji}`)}
                        >
                            <KanjiDisplay data={d.part[0]} />
                        </Link>
                        ))}
                  </HStack>
                )}
              </GridItem>
            </Fragment>
          );
        })}
      </Grid>
    </Stack>
  );
};
