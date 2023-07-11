import { Kanji } from '@/types'
import { Text, chakra } from '@chakra-ui/react'

export function KanjiDisplay (props: {
  data: Partial<Kanji>
  hideFurigana?: boolean
  isSmall?: boolean
  showAlternative?: boolean
  fontWeight?: string
}) {
  const { data, isSmall = false, hideFurigana = false, showAlternative = false, fontWeight: _fontWeight} = props
  const { kanji, reading } = data

  const fontSize = isSmall ? 'lg' : '3xl'
  const fontWeight = _fontWeight || (isSmall ? 'normal' : 'bold')

  return (
    <chakra.ruby fontSize={fontSize} textAlign="center" fontFamily="Minchou, Meiryou">
      <Text as="span" fontWeight={fontWeight}>
        {kanji?.replace(/[\(\［](.*?)[\］\)]/g, "").split("・")[0]}
      </Text>
      {!hideFurigana && (
        <chakra.rt>{reading}</chakra.rt>
        )}
        {showAlternative && /[\(\［](.*?)[\］\)]/.test(kanji ?? "") &&  <Text as="span" fontWeight={fontWeight}>
        {kanji?.substring(1)}
      </Text>}
    </chakra.ruby>
  )
}
