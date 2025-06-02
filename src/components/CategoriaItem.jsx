export function CategoriaItem(props) {
    const bgColor = props.backgroundColor == null ? '#d3d3d3' : props.backgroundColor;

    return (
        <div
            className="text-xs text-white w-fit flex items-center justify-center px-2 py-[2px] rounded"
            style={{ backgroundColor: bgColor }}
        >
            {props.categoria || "Sem categoria"}
        </div>
    )
}
