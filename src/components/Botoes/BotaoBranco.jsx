export function BotaoBranco(props) {
    return (
        <button className="border w-28 h-9 items-center justify-center rounded-full bg-white border-[#0292B7] text-[#0292B7] cursor-pointer text-xs" onClick={props.onClick}>{props.nome}</button>
    )
}