export function Header() {
    return (
        <div className="w-full flex items-center justify-between h-32 pt-10">
            <img src="public/images/logo.svg" alt="Logo da lottus" className="w-16 h-16 ml-32" />
            <ul className="flex gap-20">
                <li className="text-[14px] cursor-pointer text-[#1F2122]">Home</li>
                <li className="text-[14px] cursor-pointer text-[#1F2122]">Sobre Nós</li>
                <li className="text-[14px] cursor-pointer text-[#1F2122]">Funcionalidades</li>
                <li className="text-[14px] cursor-pointer text-[#1F2122]">Contato</li>
            </ul>
            <button className="mr-32 text-[14px] border-2 font-semibold w-20 h-8 items-center justify-center rounded-full bg-transparent border-[#0292B7] text-[#0292B7] cursor-pointer">Entrar</button>
        </div>
    )
}