"use client";

import { getPath } from "@/utils/getPath";
import { Heading, Link, List, ListItem, Stack, Text } from "@chakra-ui/react";

export const HomeIntro = () => {
  return (
    <Stack>
      <Heading>
        <Link href={getPath("/")}>
          Kanji Phonetic Components (音符) explorer
        </Link>
      </Heading>
      <Text>
        Collection of kanji phonetic components (音符), data extracted from{" "}
        <Link
          href="https://blog.goo.ne.jp/ishiseiji/e/d54e5260be574ccd22051faf92b4d3bc"
          color="blue.400"
          target="__blank"
        >
          漢字の音符, 石沢誠司
        </Link>
        , Kanji Meanings from{" "}
        <Link
          href="http://nihongo.monash.edu/kanjidic2/index.html"
          color="blue.400"
          target="__blank"
        >
          Kanjidic2
        </Link>
      </Text>
      <Text>How to use: Search by Kanji/Reading, Browse ; Some glyph may not be properly displayed. Bugs are expected</Text>
      <Stack spacing="xs">
        <Text>Related Links</Text>
        <List>
          <ListItem>
            <Link
              href="https://thekanjicode.com/list-of-phonetic-components/"
              target="__blank"
              color="blue.400"
            >
              What are phonetic components ?
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://kanjialive.com/214-traditional-kanji-radicals/"
              target="__blank"
              color="blue.400"
            >
              Kanji radicals /&quot;Meaning&quot; part of a kanji
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
};
