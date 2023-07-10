"use client";

import { KANA_ROWS } from "@/data/gojuuon";
import { Box, HStack, Link } from "@chakra-ui/react";

export const Navigation = () => {
    return <HStack　w="full">
        {KANA_ROWS.split("").map((letter,index) => <Link href={`/browse/${index}`}　key={letter} border="1px" textAlign="center" py="2" w="full" fontSize="xl"><Box >{letter}</Box></Link>)}
    </HStack>
}