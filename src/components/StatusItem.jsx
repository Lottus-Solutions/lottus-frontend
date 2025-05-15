export function StatusItem(props) {
   if (props.status === "disponivel") {
        return (
            <div className="text-xs text-white w-fit flex items-center justify-center px-2 py-[2px] rounded bg-[#00B300]">Disponível</div>
        )
    }
    else if (props.status === "reservado") {
        return (
            <div className="text-xs text-white items-center justify-center w-fit px-2 py-[2px] rounded bg-[#B0B0B0] flex gap-2">Reservado {props.qtdEmprestimos}/{props.qtdLivros}</div>
        )
    }
}