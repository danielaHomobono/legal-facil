import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSpinner, FaExclamationTriangle, FaSearch, FaGavel, FaFileContract } from "react-icons/fa";

export default function ConsultaForm({ onRespuesta }) {
  const [pregunta, setPregunta] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ejemplos] = useState([
    "¿Cómo redacto una carta de reclamo por un producto defectuoso?",
    "¿Qué debo incluir en una autorización para que mi hijo salga antes de la escuela?",
    "¿Cómo puedo solicitar la devolución de un producto comprado online?",
    "¿Qué pasos debo seguir para presentar una queja ante Defensa del Consumidor?"
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;
    
    setLoading(true);
    setError("");
    onRespuesta(null);

    try {
      // Primero verificamos que el servidor esté funcionando
      // URL del backend desplegado en Render
      const API_URL = import.meta.env.VITE_API_URL || "https://legal-facil.onrender.com";
      
      try {
        await axios.get(`${API_URL}/api/test`);
      } catch (testErr) {
        throw new Error("No se pudo conectar con el servidor. Verifica que esté en ejecución.");
      }
      
      // Ahora hacemos la consulta principal
      const res = await axios.post(`${API_URL}/api/consultar`, { pregunta });
      onRespuesta(res.data);
    } catch (err) {
      console.error("Error al consultar:", err);
      setError(err.response?.data?.error || err.message || "Ocurrió un error al consultar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const usarEjemplo = (ejemplo) => {
    setPregunta(ejemplo);
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto rounded-xl shadow-lg p-14 mt-6"
      style={{
        background: 'linear-gradient(to bottom, #4a4a4a, #2c3e50)',
        boxShadow: '0 10px 25px -5px rgba(124, 185, 232, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-2">
          <div className="flex items-center mb-4">
            <FaSearch className="text-white mr-3 text-xl" />
            <h2 className="text-2xl font-medium text-white">¿En qué puedo ayudarte hoy?</h2>
          </div>
          <motion.textarea
            className="w-full p-8 bg-gray-600 text-white border-none rounded-xl resize-none focus:outline-none focus:border-transparent transition-all shadow-inner text-lg placeholder-gray-300"
            rows={9}
            style={{
              boxShadow: 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(124, 185, 232, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.3)';
            }}
            placeholder="Escribe tu consulta legal o administrativa aquí..."
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            required
            animate={{
              scale: [1, 1.01, 1],
              transition: { duration: 0.3 }
            }}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <p className="text-base text-white w-full mb-2 font-medium">Ejemplos de consultas:</p>
          {ejemplos.map((ejemplo, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => usarEjemplo(ejemplo)}
              className="text-sm text-white py-2 px-3 rounded-full flex items-center shadow-sm"
              style={{
                background: 'rgba(124, 185, 232, 0.3)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
              whileHover={{
                background: 'rgba(124, 185, 232, 0.5)'
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {index % 2 === 0 ? <FaGavel className="mr-1 text-xs text-blue-200" /> : <FaFileContract className="mr-1 text-xs text-blue-200" />}
              {ejemplo.length > 40 ? ejemplo.substring(0, 40) + "..." : ejemplo}
            </motion.button>
          ))}
        </div>
        
        <motion.button
          type="submit"
          className="w-full text-white px-8 py-4 rounded-xl transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg font-medium shadow-md"
          style={{
            background: 'linear-gradient(45deg, #a0a0a0, #7cb9e8)',
            boxShadow: '0 4px 6px rgba(124, 185, 232, 0.3)'
          }}
          whileHover={{
            boxShadow: '0 6px 8px rgba(124, 185, 232, 0.4)'
          }}
          disabled={loading || !pregunta.trim()}
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <>
              <div 
                className="w-5 h-5 rounded-full animate-spin mr-3"
                style={{
                  border: '2px solid white',
                  borderTopColor: 'transparent'
                }}
              />
              <span>Consultando...</span>
            </>
          ) : (
            <span>Obtener respuesta</span>
          )}
        </motion.button>
        
        {error && (
          <motion.div 
            className="bg-red-900 border-l-4 border-red-500 p-4 mt-4 rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-300 mr-2" />
              <p className="text-white">{error}</p>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
} 