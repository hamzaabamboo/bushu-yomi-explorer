'use client';

import { Heading, Link, Stack, Text } from "@chakra-ui/react";

export const HomeIntro = () => {
    return <Stack>
        <Heading><Link href="/">Radical-Sound Relationship for Kanji</Link></Heading>
        <Text>Collection of radical and kanji that has relationship with certain onyomi sounds, data extracted from <Link href="https://blog.goo.ne.jp/ishiseiji/e/3180bacae127e35db289189ea5b95a4a">Here</Link></Text>
        <Text>Some glyph may not be properly displayed. Bugs are expected</Text>
    </Stack>
}