"use client";

import { KANA_COLUMNS } from "@/data/gojuuon";
import { PhoneticSemanticData } from "@/types";
import { getPath } from "@/utils/getPath";
import { Box, HStack, Input, Link } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isKana, toKatakana } from "wanakana";
import { KanjiDisplay } from "./KanjiText";

export const SearchBar = (props: { data: PhoneticSemanticData[] }) => {
  const { data } = props;
  const [input, setInput] = useState("");
  const [query, _setQuery] = useState("");

  const setQuery = useCallback(
    (input: string) => debounce(_setQuery, 500)(input),
    [_setQuery]
  );

  const results = useMemo(() => !query ? []: data.flatMap(g => {
    if (isKana(query)) {
      if (g.pronunciation.includes(toKatakana(query))) return g;
      return ({ ...g, kanjis: g.kanjis.filter(r => r.reading && toKatakana(query) === toKatakana(r.reading))})
    } else {
      return ({ ...g, kanjis: g.kanjis.filter(r => query.split('').filter((a) => r.kanji.includes(a)).length > 0)})
    }
  }).filter(g => g.kanjis.length > 0), [data, query])

  useEffect(() => {
    setQuery(input);
  }, [input]);

  return (
    <Box position="sticky" top="62px" bgColor="white">
      <Input
        w="full"
        value={input}
        fontSize="xl"
        mb={2}
        onChange={(e) => setInput(e.target.value)}
      />
      {results.length > 0 && (<Box position="relative"　zIndex="200">
        <HStack position="absolute" width="full" backgroundColor="white" shadow="md" spacing={6} mb={6} flexWrap="wrap" height={100} overflow="auto"　>
          {results
            .filter((d) => d.part[0]?.kanji)
            .slice(0,30)
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
      </Box>)}
      </Box>
  );
};
