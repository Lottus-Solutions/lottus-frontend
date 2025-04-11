import { Github, BookText } from "lucide-react";

export function Footer() {
    return (
        <div className="bg-white py-20 mt-40 flex items-center pl-32">
            <img src="/images/logo.svg" alt="Logo da lottus" className="w-32 mr-28"/>
            <div className="flex justify-between gap-48">
                <div className="flex flex-col gap-1 text-[#21568A]">
                    <h2 className="text-2xl font-semibold mb-3">Site Institucional</h2>
                    <a href="#home">Home</a>
                    <a href="#sobre">Sobre nós</a>
                    <a href="#solucoes">Soluções</a>
                    <a href="#contato">Contato</a>
                </div>
                <div className="flex flex-col gap-1 text-[#21568A]">
                    <h2 className="text-2xl font-semibold mb-3">Mais sobre a Lottus</h2>
                    <a href="https://github.com/Lottus-Solutions" className="flex items-center gap-2">
                    <img src="/images/github.svg" alt="Logo github" className="mb-1"/>Lottus Solutions
                    </a>

                </div>
                <div className="flex flex-col gap-1 text-[#21568A]">
                    <h2 className="text-2xl font-semibold mb-3">Contato</h2>
                    <p>Rua Haddock Lobo, 525 - SP</p>
                    <p>comercial@lottus.com</p>
                </div>
            </div>
        </div>

    )
}