import { KanjiData, PhoneticSemanticData } from "@/types";
import { isJoyo } from "@/utils/joyo";
import { Box, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { KanjiDisplay } from "../common/KanjiText";

export const ItemDetails = (props: { data: PhoneticSemanticData, kanjiData?: KanjiData[]}) => {
    const { data: item, kanjiData} = props;
    
    return <Grid templateColumns={["1fr", null, "128px 1fr"]} width="full">
        <GridItem>
            <Stack id={item.part[0].kanji} mt="-64px" pt="64px">
                <KanjiDisplay data={item.part[0]} showAlternative/>
            </Stack>
        </GridItem>
        <GridItem>
            <Stack alignItems="flex-start" width="full">
                {item.kanjis.map((d,idx) => {
                    const data = kanjiData?.find(m => m.kanji === d.kanji[0])
                    if (!data) {
                        console.log(d.kanji)
                    }
                    const isIrregular = item.pronunciation !== d.reading;
                    
                    return <Box key={d.kanji} backgroundColor={isIrregular? "gray.100" : "unset"}  w="full" py={1}>
                        <HStack justifyContent="space-between" alignItems="flex-start" w="full">
                        <Box width={24} textAlign="center">
                            <KanjiDisplay data={d}  fontWeight={isJoyo(d.kanji) ? "bold" : "200"}/>
                        </Box>
                        <Stack width={48}>
                            <Text>{data?.onyomi?.split(",").join(", ") ?? ""}</Text>
                            <Text>{data?.kunyomi?.split(",").join(", ") ?? ""}</Text>
                        </Stack>
                        <Stack width="full">
                            {data?.meanings.map(w => w?.split(",").join(", ")).map((w,idx) => 
                            <Text whiteSpace="break-spaces" wordBreak="break-word" key={idx}>{w}</Text>)}
                        </Stack>
                    </HStack>
                    </Box>
                })}
                </Stack>
        </GridItem>
    </Grid>
    
}