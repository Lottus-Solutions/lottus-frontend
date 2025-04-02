import { Search as SearchIcon } from "lucide-react";

export function Search() {
    return (
        <div className="relative w-4xl">
            <input placeholder="Busque por livro, autor ou ID" className="border w-full h-10 rounded-full ps-5 pe-12 border-[#727272] focus:outline-none"/>
            <SearchIcon className="absolute right-6 top-1/2 w-5 transform -translate-y-1/2 text-[#727272]" />
        </div>
    );
}
