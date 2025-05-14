import { useState } from "react";
import { Upload, X, Trash2 } from "lucide-react";
import { BotaoPrincipal } from "../botoes/BotaoPrincipal";
import { motion } from 'framer-motion';

export function ModalUpload(props) {
    const [arquivoSelecionado, setArquivoSelecionado] = useState(null);

    const handleArquivoChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
            setArquivoSelecionado(file);
        } else {
            alert("Por favor, selecione um arquivo .CSV ou .XLSX válido.");
            e.target.value = null; // limpa o input
        }
    };

    const handleExcluirArquivo = () => {
        setArquivoSelecionado(null);
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-10 rounded-2xl w-[600px] shadow-lg relative flex flex-col items-center justify-center"
            >
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={props.onClose}
                >
                    <X className="text-gray-400" />
                </button>
                <div className="mb-6 flex flex-col items-center">
                    <h3 className="text-xl">Upload de arquivos</h3>
                </div>
                <div className="flex flex-col gap-4 w-[80%] mb-6">
                    <p className="text-[#414651]">Finalidade:</p>
                    <div className="flex gap-4">
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <p className="text-[#727272] text-xs">Alunos</p>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <p className="text-[#727272] text-xs">Catálogo</p>
                        </div>
                    </div>

                    <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0292B7] hover:bg-[#f0faff] transition">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Upload className="w-6 h-6 text-gray-500" />
                            <p className="text-sm text-gray-500">Clique ou arraste um arquivo (.CSV ou .XLSX) aqui</p>
                        </div>
                        <input
                            type="file"
                            accept=".csv, .xlsx"
                            onChange={handleArquivoChange}
                            className="hidden"
                        />
                    </label>

                    {arquivoSelecionado && (
                        <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md mt-2">
                            <span className="text-sm text-gray-700 truncate max-w-[80%]">
                                {arquivoSelecionado.name}
                            </span>
                            <button onClick={handleExcluirArquivo}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    )}

                    <div className="flex gap-4 w-full justify-center mt-5">
                        <BotaoPrincipal nome="Baixar Template" />
                        <BotaoPrincipal nome="Fazer Upload" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
