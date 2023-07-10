export type Kanji = { reading?: string, kanji: string };

export type PhoneticSemanticData = { pronounciation: string, part: Kanji[], radicals: string[], kanjis: Kanji[] }

export type KanjiData = {
    kanji: string
    onyomi: string
    kunyomi: string
    meanings: string[]
    grade: number
    jlptLevel: number
}