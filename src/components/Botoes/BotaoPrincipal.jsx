export function BotaoPrincipal(props) {
    return (
        <button
            className="min-w-30 h-9 flex items-center justify-center px-4 rounded-full bg-[#0292B7] border-[1px] border-[#0292B7] text-white cursor-pointer text-xs"
            onClick={props.onClick}
        >
            {props.nome}
        </button>
    );
}