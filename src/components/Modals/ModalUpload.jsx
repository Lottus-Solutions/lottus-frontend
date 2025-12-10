import { useState } from "react";
import { Upload, X, File, Loader2 } from "lucide-react";
import { BotaoBranco } from "../Botoes/BotaoBranco";
import { motion } from 'framer-motion';

export function ModalUpload(props) {
  const [error, setError] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [finalidadeSelecionada, setFinalidadeSelecionada] = useState("");
  const [acaoAlunos, setAcaoAlunos] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleArquivoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
      setArquivoSelecionado(file);
      setError("");
      setMensagemSucesso("");
    } else {
      setError("Por favor, selecione um arquivo .CSV ou .XLSX válido.");
      e.target.value = null;
    }
  };

  const handleExcluirArquivo = () => {
    setArquivoSelecionado(null);
    setMensagemSucesso("");
  };

  const handleUpload = async () => {
    setMensagemSucesso("");
    setError("");

    if (!finalidadeSelecionada) {
      setError("Selecione a finalidade do upload (Alunos ou Catálogo).");
      return;
    }

    // if (finalidadeSelecionada === "alunos" && !acaoAlunos) {
    //   setError("Selecione a ação para os alunos (Adicionar ou Sobrescrever).");
    //   return;
    // }

    if (!arquivoSelecionado) {
      setError("Selecione um arquivo antes de fazer o upload.");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("arquivo", arquivoSelecionado);
    formData.append("finalidade", finalidadeSelecionada);
    // if (finalidadeSelecionada === "alunos") {
    //   formData.append("acao", acaoAlunos);
    // }

    const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

    try {
      const response = await fetch(`${uploadUrl}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.erro || "Erro ao enviar arquivo.");
      } else {
        setMensagemSucesso(data.mensagem || "Upload realizado com sucesso!");
        setArquivoSelecionado(null);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    if (!finalidadeSelecionada) {
      setError("Selecione a finalidade antes de baixar o template.");
      return;
    }

    let fileName = "";
    let filePath = "";

    if (finalidadeSelecionada === "alunos") {
      fileName = "Template - Alunos.xlsx";
      filePath = "/templates/Template - Alunos.xlsx";
    } else if (finalidadeSelecionada === "livros") {
      fileName = "Template - Livros.xlsx";
      filePath = "/templates/Template - Livros.xlsx";
    } else {
      setError("Finalidade inválida.");
      return;
    }

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="finalidade"
                value="alunos"
                checked={finalidadeSelecionada === "alunos"}
                onChange={(e) => {
                  setFinalidadeSelecionada(e.target.value);
                  setAcaoAlunos("");
                }}
              />
              <span className="text-[#727272] text-sm">Alunos</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="finalidade"
                value="livros"
                checked={finalidadeSelecionada === "livros"}
                onChange={(e) => {
                  setFinalidadeSelecionada(e.target.value);
                  setAcaoAlunos("");
                  setError("");
                  setMensagemSucesso("");
                }}

              />
              <span className="text-[#727272] text-sm">Catálogo</span>
            </label>
          </div>

          {/* {finalidadeSelecionada === "alunos" && (
            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm text-zinc-600">Ação desejada:</p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="acaoAlunos"
                  value="adicionar"
                  checked={acaoAlunos === "adicionar"}
                  onChange={(e) => setAcaoAlunos(e.target.value)}
                />
                <span className="text-xs text-zinc-600">Adicionar novos alunos</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="acaoAlunos"
                  value="sobrescrever"
                  checked={acaoAlunos === "sobrescrever"}
                  onChange={(e) => setAcaoAlunos(e.target.value)}
                />
                <span className="text-xs text-zinc-600">Sobrescrever alunos existentes</span>
              </label>
            </div>
          )} */}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-2 rounded w-full text-sm mt-3">
              {error}
            </div>
          )}

          {mensagemSucesso && (
            <div className="bg-green-100 border border-green-400 text-green-600 px-4 py-2 rounded w-full text-sm mt-3">
              {mensagemSucesso}
            </div>
          )}

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
            <div className="flex items-center justify-between px-4 py-2 rounded-md mt-2 bg-zinc-100 border border-zinc-200">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-zinc-400" />
                <div className="flex flex-col max-w-[200px]">
                  <span className="text-sm text-zinc-800 font-medium truncate">
                    {arquivoSelecionado.name}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {(arquivoSelecionado.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
              <button onClick={handleExcluirArquivo}>
                <X className="w-4 h-4 text-zinc-400 cursor-pointer" />
              </button>
            </div>
          )}

          <div className="flex gap-4 w-full justify-center mt-5">
            <BotaoBranco nome="Baixar Template" onClick={handleDownloadTemplate} />

            <button
              onClick={handleUpload}
              disabled={isLoading}
              className={`min-w-30 w-fit h-9 flex items-center justify-center px-4 rounded-full bg-[#0292B7] border-[1px] border-[#0292B7] text-white cursor-pointer text-xs ${isLoading && "opacity-70 cursor-not-allowed"}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Carregando...
                </>
              ) : (
                "Fazer Upload"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
