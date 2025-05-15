export function BotaoInativo(props) {
    return (
        <button
            className="min-w-30 w-fit h-9 flex items-center justify-center px-4 rounded-full bg-[#727272] border-[1px] border-[#727272] text-white text-xs cursor-not-allowed"
            disabled
        >
            {props.nome}
        </button>
    );
}
