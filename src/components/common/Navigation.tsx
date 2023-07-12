"use client";

import { KANA_ROWS } from "@/data/gojuuon";
import { getPath } from "@/utils/getPath";
import { Link } from "@chakra-ui/next-js";
import { Box, HStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export const Navigation = () => {
    const pathname = usePathname();
    const all = pathname.split("/").slice(-1)[0] === 'all';
    return <HStack　w="full" backgroundColor="white" position="sticky" top={0} py={2} zIndex={100}>
        {KANA_ROWS.split("").map((letter,index) => <Link href={getPath(`/browse/${index}${all ? "/all": ""}`)}　key={letter} shadow="md" textAlign="center" py="2" w="full" fontSize="xl"><Box >{letter}</Box></Link>)}
    </HStack>
}