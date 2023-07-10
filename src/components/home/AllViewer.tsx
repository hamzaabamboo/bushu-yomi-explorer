'use client'
import { PhoneticSemanticData } from "@/types"
import { isJoyo } from "@/utils/joyo"
import { Divider, Grid, GridItem, HStack, Heading, Input, Stack, Switch, Text } from "@chakra-ui/react"
import { groupBy, values } from "lodash"
import { Fragment, useMemo, useState, } from "react"
import { KanjiDisplay } from "../common/KanjiText"

export const AllViewer = (props: {data: PhoneticSemanticData[] }) => {
    const {data}= props
    const [joyo, setJoyo] = useState(true);
    const groups = useMemo(() => values(groupBy(joyo ? data.map(d => ({...d, kanjis: d.kanjis.filter(d => isJoyo(d.kanji))})).filter(d => d.kanjis.length > 0): data, d => d.pronounciation)), [data, joyo]);
    
    return <Stack>
        <HStack><Switch isChecked={joyo} onChange={(e) => setJoyo(e.target.checked)}/><Text>Joyo Only</Text></HStack>
        <Divider />
        <Input w='full'/>
        <Grid templateColumns="80px 1fr" gap={6}>
            {groups.map(g => {
                return <Fragment key={g[0].pronounciation}>
                    <GridItem h="full">
                        <HStack w="full"><Heading >{g[0].pronounciation}</Heading><Divider orientation='vertical' width="1px"/></HStack>
                    </GridItem>
                  <GridItem>
                  <HStack spacing={6} mb={6} flexWrap="wrap">
                        {
                            g.filter(d => !!d.part[0]).map((d,idx) => ( <GridItem key={idx} shadow="md" boxSize={16} display="flex" justifyContent="center" alignItems="center"><KanjiDisplay data={d.part[0]}/></GridItem> ))
                        }
                    </HStack>
                  </GridItem>
                </Fragment>
            })}
        </Grid>
    </Stack>
}