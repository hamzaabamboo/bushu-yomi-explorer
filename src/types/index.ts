export type Kanji = { reading?: string, kanji: string };

export type PhoneticSemanticData = { pronounciation: string, part: Kanji[], radicals: string[], kanjis: Kanji[] }