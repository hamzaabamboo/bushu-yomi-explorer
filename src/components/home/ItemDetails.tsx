import { KanjiData, PhoneticSemanticData } from "@/types";
import { Box, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { KanjiDisplay } from "../common/KanjiText";

export const ItemDetails = (props: { data: PhoneticSemanticData, kanjiData?: KanjiData[]}) => {
    const { data: item, kanjiData} = props;
    
    return <Grid templateColumns="1fr 4fr">
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
                    return <HStack key={d.kanji} justifyContent="space-between" alignItems="flex-start" w="full">
                        <Box width={24}>
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
                })}
            </Stack>
        </GridItem>
    </Grid>
    
}