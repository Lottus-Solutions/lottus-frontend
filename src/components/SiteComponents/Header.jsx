import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <header className="w-full bg-[#F0F6F9] pt-10 left-0 z-50">
            <div className="flex items-center justify-between h-20 px-6 md:px-20">
                <img
                    src="/images/logo.svg"
                    alt="Logo da lottus"
                    className="w-12 h-12"
                />

                {/* Menu Desktop */}
                <nav className="hidden lg:flex">
                    <ul className="flex gap-16 items-center">
                        {["home", "sobre", "solucoes", "contato"].map((item) => (
                            <li
                                key={item}
                                className="text-[14px] cursor-pointer text-[#1F2122] relative group"
                            >
                                <a href={`#${item}`}>
                                    {item === "home"
                                        ? "Home"
                                        : item === "sobre"
                                            ? "Sobre Nós"
                                            : item === "solucoes"
                                                ? "Soluções"
                                                : "Contato"}
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#0292B7] transition-all ease-in-out duration-400 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Botão de entrar - Desktop */}
                <div className="hidden lg:flex">
                    <button
                        className="text-[14px] border-2 font-semibold w-24 h-9 items-center justify-center rounded-full bg-transparent border-[#0292B7] text-[#0292B7] cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Entrar
                    </button>
                </div>

                {/* Botão Hamburger - Mobile */}
                <div className="lg:hidden">
                    <button onClick={handleToggle}>
                        {isOpen ? (
                            <X size={28} className="text-[#1F2122]" />
                        ) : (
                            <Menu size={28} className="text-[#1F2122]" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="lg:hidden fixed top-0 left-0 z-100 bg-white w-full shadow-md">
                    <div className="flex justify-between items-center px-6 pt-10">
                        <img
                            src="/images/logo.svg"
                            alt="Logo da lottus"
                            className="w-12 h-12"
                        />
                        <button onClick={handleToggle}>
                            <X size={28} className="text-[#1F2122]" />
                        </button>
                    </div>
                    <ul className="flex flex-col items-center gap-6 py-10">
                        {["home", "sobre", "solucoes", "contato"].map((item) => (
                            <li
                                key={item}
                                className="text-[16px] text-[#1F2122] cursor-pointer"
                                onClick={handleToggle}
                            >
                                <a href={`#${item}`}>
                                    {item === "home"
                                        ? "Home"
                                        : item === "sobre"
                                            ? "Sobre Nós"
                                            : item === "solucoes"
                                                ? "Soluções"
                                                : "Contato"}
                                </a>
                            </li>
                        ))}
                        <button
                            className="text-[14px] border-2 font-semibold w-28 h-10 rounded-full bg-transparent border-[#0292B7] text-[#0292B7] cursor-pointer"
                            onClick={() => {
                                navigate("/login");
                                setIsOpen(false);
                            }}
                        >
                            Entrar
                        </button>
                    </ul>
                </div>
            )}
        </header>
    );
}
