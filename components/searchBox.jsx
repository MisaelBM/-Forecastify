import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search } from 'lucide-react';

export default function SearchBox () {

    return (
        <>
            <div className="m-auto mt-[100px] w-fit h-[50px] flex flex-row justify-between items-center gap-[20px]">
                <div className="bg-white w-fit h-fit flex flex-row gap-[5px] p-[5px] px-[20px] rounded-full"><Input className="w-[600px] p-0 border-0 font-bold text-black text-2xl" id="search" placeholder="Search a location" /><label htmlFor="search"><Search size={35} /></label></div>
                <Button className="w-fit h-[100%] text-xl bg-white text-black font-bold rounded-full hover:bg-gray-200">Use my current location <MapPin size={104} /></Button>
            </div>
        </>
    )
}