import { MoveRight } from "lucide-react";

export function SessaoHome() {
    return (
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
    )
}