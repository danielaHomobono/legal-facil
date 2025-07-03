import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultaForm from "./components/ConsultaForm";
import Logo from "./components/Logo";
import LoadingSpinner from "./components/LoadingSpinner";
import { FaCopy, FaCheckCircle, FaLightbulb, FaFileAlt, FaQuestionCircle, FaArrowUp } from "react-icons/fa";

function App() {
  const [respuesta, setRespuesta] = useState(null);
  const [copiado, setCopiado] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // El efecto de carga se ha movido abajo

  // Detectar scroll para mostrar botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copiarModelo = () => {
    if (respuesta?.modelo) {
      navigator.clipboard.writeText(respuesta.modelo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Forzar un tiempo de carga para ver el spinner
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-6 text-xl font-medium" style={{ color: '#7cb9e8' }}>
            Cargando LegalFácil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex flex-col items-center justify-start p-4 pt-10 w-full">
      {/* Logo y encabezado */}
      <Logo />
      
      {/* Sección de ayuda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 mb-12 max-w-5xl text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl font-medium text-gray-600">¿Cómo puedo ayudarte?</h2>
        </div>
        <div className="overflow-hidden">
          {[
            "Escribe tu consulta legal o administrativa y recibirás una respuesta clara y sencilla,",            
            "junto con un modelo de texto que podrás utilizar."
          ].map((line, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.3) }}
              className="text-gray-600 text-lg mb-1"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
      
      {/* Formulario de consulta */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-5xl"
      >
        <ConsultaForm onRespuesta={(data) => {
          setRespuesta(data);
          // Scroll suave hacia la respuesta
          if (data) {
            setTimeout(() => {
              document.getElementById('respuesta')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        }} />
      </motion.div>
      
      {/* Sección de respuesta */}
      <AnimatePresence>
        {respuesta && (
          <motion.div 
            id="respuesta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-10 w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border-l-4 border-gray-500 pl-4"
            >
              <div className="flex items-center mb-2">
                <FaFileAlt className="text-gray-700 mr-2" />
                <h2 className="font-semibold text-lg text-gray-800">Explicación clara:</h2>
              </div>
              <p className="text-gray-700">{respuesta.explicacion}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border-l-4 border-gray-500 pl-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaFileAlt className="text-gray-700 mr-2" />
                  <h2 className="font-semibold text-lg text-gray-800">Texto sugerido:</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copiarModelo}
                  className={`flex items-center px-3 py-1 rounded-full text-sm ${copiado ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  {copiado ? (
                    <>
                      <FaCheckCircle className="mr-1" /> Copiado
                    </>
                  ) : (
                    <>
                      <FaCopy className="mr-1" /> Copiar
                    </>
                  )}
                </motion.button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-gray-700 border border-gray-200 max-h-60 overflow-y-auto">{respuesta.modelo}</pre>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="border-l-4 border-gray-500 pl-4"
            >
              <div className="flex items-center mb-2">
                <FaLightbulb className="text-gray-700 mr-2" />
                <h2 className="font-semibold text-lg text-gray-800">Consejo adicional:</h2>
              </div>
              <p className="text-gray-700">{respuesta.consejo}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-gray-500 text-sm pb-4"
      >
        © {new Date().getFullYear()} LegalFácil - Asistencia legal simplificada
      </motion.div>
      
      {/* Botón para volver arriba */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 text-white"
            style={{
              background: 'linear-gradient(45deg, #a0a0a0, #7cb9e8)',
              boxShadow: '0 4px 6px rgba(124, 185, 232, 0.3)'
            }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 