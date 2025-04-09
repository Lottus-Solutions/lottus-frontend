import { ChevronUp, MoveRight } from "lucide-react";
import { Header } from "./components/Header";

export function Site() {
    return (
        <div className="bg-[#F0F6F9] max-w-screen h-full">
            <Header />
            <div className="flex pt-24 px-32 justify-between items-center gap-8" id="home">
                <div className="w-[520px] h-72 flex justify-center flex-col gap-5">
                    <h2 className="text-5xl font-bold">Transforme a gestão da sua <span className="text-[#0292B7]">biblioteca</span> com tecnologia e eficiência.</h2>
                    <p className="text-[#6D6D6D]">Simplifique o controle de empréstimos, organize seu catálogo e acompanhe o histórico de leitura dos alunos de forma prática e eficiente.</p>
                    <p className="flex gap-2 items-center text-[#0292B7] font-bold">Entre em contato <MoveRight className="text-[#0292B7] w-5" /></p>
                </div>
                <video
                    className="w-2xl rounded-3xl shadow-lg relative bottom-20~flex"
                    loop
                    autoPlay
                    muted
                    playsInline
                >
                    <source src="/images/garota_lendo.mp4" type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            </div>
            <div className="bg-white py-10 mt-52 flex items-center gap-40 scroll-mt-36" id="sobre">
                <img src="/images/lottus_flower.png" alt="Imagem de uma flor de lotus" className="ml-32 rounded-3xl shadow" />
                <div className="w-96 flex flex-col gap-3">
                    <p className="text-[14px] text-[#0292B7] font-semibold">Sobre Nós</p>
                    <h2 className="text-2xl font-bold">Fluidez, Conhecimento e Inovação</h2>
                    <p className="text-[14px] text-[#6D6D6D]">Inspirados na flor de lótus, símbolo de resiliência e conhecimento, criamos um sistema inovador para gestão de bibliotecas.
                        Com tecnologia moderna e eficiente, ajudamos bibliotecas a florescer no universo do conhecimento.</p>
                    <p className="text-[14px] font-semibold text-[#0292B7]">Ler mais</p>
                </div>
            </div>
            <div className=" bg-white flex flex-col items-center justify-center mt-30 py-20 px-48 gap-10">
                <h2 className="text-2xl font-semibold mb-10">Conheça os <span className="text-[#0292B7]">princípios</span> que nos guiam</h2>
                <div className="flex gap-68">
                    <div className="w-60 flex flex-col gap-4">
                        <h2 className="font-semibold">Nossa missão</h2>
                        <p className="text-[14px] text-[#6D6D6D]">Facilitar a administração de bibliotecas escolares por meio de tecnologia intuitiva, promovendo a organização do acervo e incentivando o hábito da leitura entre os alunos.</p>
                    </div>
                    <div className="w-60 flex flex-col gap-4">
                        <h2 className="font-semibold">Nossa visão</h2>
                        <p className="text-[14px] text-[#6D6D6D]">Ser a plataforma referência na modernização e gestão de bibliotecas escolares, impactando positivamente o aprendizado e o acesso à informação nas escolas.</p>
                    </div>
                    <div className="w-60 flex flex-col gap-4">
                        <h2 className="font-semibold">Nossos valores</h2>
                        <p className="text-[14px] text-[#6D6D6D]">Compromisso com a educação, inovação contínua, acessibilidade e eficiência na gestão das bibliotecas escolares.</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-10 right-10 bg-white text-[#0292B7] p-2 rounded-full shadow-lg hover:transition duration-300"
                title="Voltar ao topo"
            >
                <ChevronUp />
            </button>


        </div>
    )
}