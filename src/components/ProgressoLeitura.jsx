export function ProgressoLeitura(props) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-[#727272] text-xs">Leituras Obrigatórias</p>
            <div className="flex items-center gap-12 mt-2">
                <div className="flex gap-1">
                    {Array.from({ length: props.total }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < props.lidos ? 'bg-[#0292B7]' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
                <p className="text-xs">{`${props.lidos}/${props.total}`}</p>
            </div>
        </div>
    )
}
