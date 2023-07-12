import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/common/Navigation";
import { SearchBar } from "@/components/common/SearchBar";
import { HomeIntro } from "@/components/home/HomeIntro";
import { readFile } from "fs/promises";
import { join } from "path";
import { ReactNode } from "react";

const fetchData = async () => {
   const data = JSON.parse(await readFile(join(__dirname, "../../../../../src/data/onpubushu.json"),"utf-8")) 

   return {
    wordsData: data,
   }
}

export default async function BrowseLayout(props: { children: ReactNode }) {
    const { children } = props;
    const { wordsData } = await fetchData();

  return (
    <Layout>
      <HomeIntro />
      <Navigation />
      <SearchBar data={wordsData} />
      {children}
    </Layout>
  )
}
