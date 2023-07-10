import { KanjiData, PhoneticSemanticData } from "@/types";
import { Box, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { KanjiDisplay } from "../common/KanjiText";

export const ItemDetails = (props: { data: PhoneticSemanticData, kanjiData?: KanjiData[]}) => {
    const { data: item, kanjiData} = props;
    
    return <Grid templateColumns="128px 1fr">
        <GridItem>
            <Stack>
                <KanjiDisplay data={item.part[0]} showAlternative/>
            </Stack>
        </GridItem>
        <GridItem>
        <Stack alignItems="flex-start">
                {item.kanjis.map((d,idx) => {
                    const data = kanjiData?.find(m => m.kanji === d.kanji[0])
                    if (!data) {
                        console.log(d.kanji)
                    }
                    const isIrregular = item.pronunciation !== d.reading;
                    
                    return <Box key={d.kanji} backgroundColor={isIrregular? "gray.100" : "unset"}  w="full" py={1}>
                        <HStack justifyContent="space-between" alignItems="flex-start" w="full" id={d.kanji} mt="-64px" pt="64px">
                        <Box width={24} mx={2} textAlign="center">
                         <KanjiDisplay  data={d} />
                        </Box>
                        <Stack width={48}>
                            <Text>{data?.onyomi?.split(",").join(", ") ?? ""}</Text>
                            <Text>{data?.kunyomi?.split(",").join(", ") ?? ""}</Text>
                        </Stack>
                        <Stack width="full">
                            {data?.meanings.map(w => w?.split(",").join(", ")).map((w,idx) => 
                            <Text key={idx}>{w}</Text>)}
                        </Stack>
                    </HStack>
                    </Box>
                })}
            </Stack>
        </GridItem>
    </Grid>
    
}