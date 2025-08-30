"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search } from 'lucide-react';
import SearchBox from "../components/searchBox";

export default function Home() {

  return (
    <>
      <main className="bg-[#589BB8] w-screen h-screen pt-[3vh] relative font-(family-name:--font-love)">
        <div className="p-12">
          <section className="w-screen h-screen max-w-[1000px] max-h-[450px] relative mx-auto flex justify-center items-center">
            <div><img src="/img/cloud1.png" className="absolute top-0 left-0 animate-float-slow" alt="nuvem1"/></div>
            <div><img src="/img/cloud2.png" className="absolute top-0 right-0 animate-float-medium" alt="nuvem2"/></div>
            <div><img src="/img/cloud3.png" className="absolute bottom-0 right-0 animate-float-fast" alt="nuvem3"/></div>
            <div><img src="/img/cloud4.png" className="absolute bottom-0 left-0 animate-float-slow-delayed" alt="nuvem4"/></div>
            <div><h1 className="text-9xl">Forecastify</h1></div>
          </section>
          <SearchBox className={"pt-12"} />
        </div>
        <section className="absolute flex justify-center w-screen h-[70px] bottom-0 bg-[url(/img/cloud5.png)]"></section>
      </main>
    </>
  );
}