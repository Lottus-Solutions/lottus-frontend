import { useState } from "react";

export function Perfil() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="absolute top-14 right-14">
            <img
                src="/images/user.svg"
                alt="Icone de usuario"
                className="w-10 h-10 rounded-full shadow cursor-pointer hover:scale-103 transition-transform"
                onClick={toggleDropdown}
            />
            {isDropdownOpen && (
                <div className="absolute mt-2 right-0 bg-white rounded-2xl p-4 w-40 h-20 shadow-lg flex flex-col items-start gap-2">
                    <p>Olá, Mary</p>
                    <p className="text-sm text-[#727272] cursor-pointer hover:text-[#0292B7] transition-colors">Ver perfil</p>
                </div>
            )}
        </div>
    );
}