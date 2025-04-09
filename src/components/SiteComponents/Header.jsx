import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex items-center justify-between h-32 pt-10">
            <img src="/images/logo.svg" alt="Logo da lottus" className="w-16 h-16 ml-32" />

            <ul className="flex gap-20">
                <li className="text-[14px] cursor-pointer text-[#1F2122] relative group">
                    <a href="#home">
                        Home
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#0292B7] transition-all ease-in-out duration-400 group-hover:w-full"></span>
                    </a>
                </li>
                <li className="text-[14px] cursor-pointer text-[#1F2122] relative group">
                    <a href="#sobre">
                        Sobre Nós
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#0292B7] transition-all duration-400 ease-in-out group-hover:w-full"></span>
                    </a>
                </li>
                <li className="text-[14px] cursor-pointer text-[#1F2122] relative group">
                    <a href="#solucoes">
                        Soluções
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#0292B7] transition-all duration-400 ease-in-out group-hover:w-full"></span>
                    </a>
                </li>
                <li className="text-[14px] cursor-pointer text-[#1F2122] relative group">
                    <a href="#contato">
                        Contato
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#0292B7] transition-all duration-400 ease-in-out group-hover:w-full"></span>
                    </a>
                </li>
            </ul>

            <button
                className="mr-32 text-[14px] border-2 font-semibold w-20 h-8 items-center justify-center rounded-full bg-transparent border-[#0292B7] text-[#0292B7] cursor-pointer"
                onClick={() => navigate("/login")}
            >
                Entrar
            </button>
        </div>
    );
}

