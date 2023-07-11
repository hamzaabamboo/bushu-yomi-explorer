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
import { debounce, groupBy, values } from "lodash";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { isKana, toKatakana } from "wanakana";
import { KanjiDisplay } from "../common/KanjiText";
import { ItemDetails } from "./ItemDetails";

export const AllViewer = (props: {
  data: PhoneticSemanticData[];
  kanjiData?: Record<string, { part: string[]; kanjis: KanjiData[] }[]>;
  hideSearch?: boolean;
  showDetails?: boolean;
}) => {
  const { data, hideSearch = false, showDetails = false, kanjiData } = props;
  const [joyo, setJoyo] = useLocalStorage("showJoyo", true);
  const [input, setInput] = useState("");
  const [filter, _setFilter] = useState("");
  const setFilter = useCallback((input:string) => debounce(_setFilter, 500)(input), [_setFilter])
  
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

  useEffect(() => {
    setFilter(input);
  }, [input])

  const filteredList = useMemo(() => !filter ? groups: groups.map(g => {
    if (isKana(filter)) {
      if (g[0].pronunciation.includes(toKatakana(filter))) return g;
      return g.map(g => ({ ...g, kanjis: g.kanjis.filter(r => r.reading && toKatakana(filter) === toKatakana(r.reading))})).filter(g => g.kanjis.length > 0)
    } else {
      return g.map(g => ({ ...g, kanjis: g.kanjis.filter(r => filter.split('').filter((a) => r.kanji.includes(a)).length > 0)})).filter(g => g.kanjis.length > 0)
    }
  }).filter(g => g.length > 0), [groups, filter])
  
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
          value={input}
          fontSize="xl"
          mb={2}
          onChange={(e) => setInput(e.target.value)}
        />
      )}
      <Grid templateColumns={["1fr", null, "80px 1fr"]} gap={6} w="full">
        {filteredList.map((g) => {
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
                        href={getPath(`/browse/${KANA_COLUMNS.findIndex(s => s.includes(d.pronunciation?.[0]))　}#${d.part[0].kanji}`)}
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
