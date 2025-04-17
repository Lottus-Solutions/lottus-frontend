import { Search as SearchIcon } from "lucide-react";

export function Search(props) {
    return (
        <div className="relative w-4xl flex-1 mr-4">
            <input placeholder={props.placeholder} className="flex items-center text-xs border w-full h-9 rounded-full ps-5 pe-12 border-[#727272] focus:outline-none placeholder:text-xs"/>
            <SearchIcon className="absolute right-6 top-1/2 w-4 transform -translate-y-1/2 text-[#727272]" />
        </div>
    );
}
