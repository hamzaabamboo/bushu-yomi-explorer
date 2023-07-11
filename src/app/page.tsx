import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/common/Navigation";
import { SearchBar } from "@/components/common/SearchBar";
import { AllViewer } from "@/components/home/AllViewer";
import { HomeIntro } from "@/components/home/HomeIntro";
import { PhoneticSemanticData } from "@/types";
import { readFile } from "fs/promises";
import { join } from "path";

const fetchData = async () => {
   const data = JSON.parse(await readFile(join(__dirname, "../../../src/data/onpubushu.json"),"utf-8")) 
   return data as PhoneticSemanticData[]
}

export default async function Home() {
  const data = await fetchData();

  return (
    <Layout>
      <HomeIntro />
      <Navigation />
      <SearchBar data={data}/>
      <AllViewer data={data}/>
    </Layout>
  )
}
