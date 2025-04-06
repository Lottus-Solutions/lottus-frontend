import { Search as SearchIcon } from "lucide-react";

export function Search() {
    return (
        <div className="relative w-4xl flex-1 mr-10">
            <input placeholder="Busque por livro, autor ou ID" className="flex items-center text-xs border w-full h-9 rounded-full ps-5 pe-12 border-[#727272] focus:outline-none placeholder:text-xs"/>
            <SearchIcon className="absolute right-6 top-1/2 w-4 transform -translate-y-1/2 text-[#727272]" />
        </div>
    );
}
