"use client";
import { KANA_COLUMNS } from "@/data/gojuuon";
import { KanjiData, PhoneticSemanticData } from "@/types";
import { getPath } from "@/utils/getPath";
import { isJoyo } from "@/utils/joyo";
import {
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Hide,
  Link,
  Show,
  Stack
} from "@chakra-ui/react";
import { groupBy, values } from "lodash";
import { usePathname } from "next/navigation";
import { join } from "path";
import { Fragment, useMemo } from "react";
import { KanjiDisplay } from "../common/KanjiText";
import { ItemDetails } from "./ItemDetails";

export const AllViewer = (props: {
  data: PhoneticSemanticData[];
  kanjiData?: Record<string, { part: string[]; kanjis: KanjiData[] }[]>;
  hideSearch?: boolean;
  showDetails?: boolean;
  showAll?: boolean;
}) => {
  const { data, hideSearch = false, showDetails = false, kanjiData, showAll } = props;
  const pathname = usePathname();
  const groups = useMemo(
    () =>
      values(
        groupBy(
          !showAll
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
    [data, showAll]
  );
  
  return (
    <Stack>
      <HStack>
      { !showAll ? <Link href={getPath(join(pathname, "/all"))}>Show All Kanjis</Link> : <Link href={getPath(join(pathname, ".."))}>Show Joyo Only</Link>}
      </HStack>
      <Divider />
      <Grid templateColumns={["1fr", null, "80px 1fr"]} gap={6} w="full">
        {groups.map((g) => {
          return (
            <Fragment key={g[0].pronunciation}>
              <GridItem h="full">
                <Stack direction={["column", null, "row"]} h="full" alignItems="flex-start">
                  <Heading flex="1">{g[0].pronunciation}</Heading>
                  <Hide below="md">
                    <Divider orientation="vertical"/>
                  </Hide>
                  <Show below="md">
                    <Divider orientation="horizontal"/>
                  </Show>
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
                        href={getPath(`/browse/${KANA_COLUMNS.findIndex(s => s.includes(d.pronunciation?.[0]))}${ showAll || !isJoyo(d.part[0].kanji)? "/all": ""}#${d.part[0].kanji}`)}
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
