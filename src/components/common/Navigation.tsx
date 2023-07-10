"use client";

import { KANA_ROWS } from "@/data/gojuuon";
import { getPath } from "@/utils/getPath";
import { Box, HStack, Link } from "@chakra-ui/react";

export const Navigation = () => {
    return <HStack　w="full" backgroundColor="white" position="sticky" top={0} py={2}>
        {KANA_ROWS.split("").map((letter,index) => <Link href={getPath(`/browse/${index}`)}　key={letter} shadow="md" textAlign="center" py="2" w="full" fontSize="xl"><Box >{letter}</Box></Link>)}
    </HStack>
}