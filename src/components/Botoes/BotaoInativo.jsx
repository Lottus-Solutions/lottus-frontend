export function BotaoInativo(props) {
    return (
        <button className="border min-w-30 h-9 flex items-center justify-center px-4 rounded-full bg-[#727272] text-white cursor-pointer text-xs">{props.nome}</button>
    )
}