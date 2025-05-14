import { useNavigate } from 'react-router-dom'

export function CardTurma(props) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/alunos')
    }

    return (
        <div 
            onClick={handleClick}
            className="w-64 h-52 flex flex-col justify-between cursor-pointer items-center mt-4 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
            <div className="w-full h-1/3 bg-[#0292B7] border-[#0292B7] border-l-[1px] border-r-[1px] border-t-[1px] rounded-t-2xl flex justify-center items-center">
                
            </div>
            <div className="w-full h-2/3 bg-white border-[#0292B7] border-l-[1px] border-r-[1px] border-b-[1px] rounded-b-2xl flex justify-center items-center">
                <h2 className="text-2xl font-semibold">{props.turma}</h2>
            </div>
        </div>
    )
}
