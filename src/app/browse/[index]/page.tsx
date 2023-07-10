import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/common/Navigation";
import { AllViewer } from "@/components/home/AllViewer";
import { HomeIntro } from "@/components/home/HomeIntro";
import { KANA_COLUMNS } from "@/data/gojuuon";
import { PhoneticSemanticData } from "@/types";
import { readFile } from "fs/promises";
import { join } from "path";

const fetchData = async (row: number) => {
   const data = JSON.parse(await readFile(join(__dirname, "../../../../../src/data/onpubushu.json"),"utf-8")) 
   return data.filter((d:PhoneticSemanticData) => KANA_COLUMNS[row].includes(d.pronounciation[0]))
}

export default async function Home(props: { params: { index: number } }) {
    const { index } = props.params;
  const data = await fetchData(Number(index));

  return (
    <Layout>
      <HomeIntro />
      <Navigation />
      <AllViewer data={data}/>
    </Layout>
  )
}
