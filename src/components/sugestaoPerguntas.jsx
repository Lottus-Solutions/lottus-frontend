import { motion, AnimatePresence } from "framer-motion";

export function SugestaoPerguntas({ perguntas, setInputValue }) {
    const handleQuestionClick = (question) => {
      setInputValue(question);  
    };
  
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={perguntas.join("-")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-transparent mt-5 w-2xl mx-auto"
        >
          {perguntas.length >= 1 && (
            <motion.div 
              className="transition-all duration-200 transform hover:scale-102 cursor-pointer"
              onClick={() => handleQuestionClick(perguntas[0])}  
            >
              <p className="italic text-gray-700 text-sm">{perguntas[0]}</p>
              <hr className="my-2 border-gray-500" />
            </motion.div>
          )}
          {perguntas.length >= 2 && (
            <motion.div 
              className="transition-all duration-200 transform hover:scale-102 cursor-pointer"
              onClick={() => handleQuestionClick(perguntas[1])}
            >
              <p className="italic text-gray-700 text-sm">{perguntas[1]}</p>
              <hr className="my-2 border-gray-400" />
            </motion.div>
          )}
          {perguntas.length >= 3 && (
            <motion.div 
              className="transition-all duration-200 transform hover:scale-102 cursor-pointer"
              onClick={() => handleQuestionClick(perguntas[2])}
            >
              <p className="italic text-gray-700 text-sm">{perguntas[2]}</p>
              <hr className="my-2 border-gray-300" />
            </motion.div>
          )}
          {perguntas.length >= 4 && (
            <motion.div 
              className="transition-all duration-200 transform hover:scale-102 cursor-pointer"
              onClick={() => handleQuestionClick(perguntas[3])}
            >
              <p className="italic text-gray-700 text-sm">{perguntas[3]}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }