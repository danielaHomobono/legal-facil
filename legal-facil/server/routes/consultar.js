import express from 'express';
import axios from 'axios';

const router = express.Router();

// Función para manejar respuestas de fallback en caso de error con OpenAI
function getRespuestaFallback(pregunta) {
  pregunta = pregunta.toLowerCase();
  
  // Respuestas para diferentes tipos de consultas
  const respuestas = {
    escuela: {
      explicacion: "Para que tu hijo pueda retirarse antes de la escuela, necesitas proporcionar una autorización escrita a la institución educativa. Esta nota debe incluir la fecha, el nombre completo del estudiante, el motivo de la salida anticipada, la hora de salida y tu firma como padre/madre o tutor legal.",
      modelo: "[Fecha]\n\nA quien corresponda:\n\nPor medio de la presente, yo [Tu nombre completo], en mi calidad de [padre/madre/tutor legal] de [Nombre completo del estudiante], quien cursa el [grado/año] en el grupo [grupo], autorizo a que mi hijo/a se retire de la institución a las [hora] del día [fecha] por motivo de [razón de la salida anticipada].\n\nAgradezco su atención y quedo a su disposición para cualquier aclaración.\n\nAtentamente,\n\n[Tu nombre]\n[Tu firma]\n[Tu número de teléfono]",
      consejo: "Es recomendable entregar esta nota con al menos un día de anticipación y confirmar que fue recibida. También asegúrate de que la persona que recogerá al estudiante esté autorizada en los registros de la escuela."
    },
    reclamo: {
      explicacion: "Para presentar un reclamo formal por un producto o servicio defectuoso, debes redactar una carta de reclamo dirigida a la empresa responsable, detallando el problema y solicitando una solución específica.",
      modelo: "[Tu dirección]\n[Tu correo electrónico]\n[Tu teléfono]\n[Fecha]\n\n[Nombre de la empresa]\n[Dirección de la empresa]\n\nAsunto: Reclamo por [producto/servicio defectuoso]\n\nEstimados señores:\n\nMe dirijo a ustedes para presentar un reclamo formal por [descripción del problema] adquirido/contratado el día [fecha de compra/contratación] con número de factura/pedido [número].\n\n[Descripción detallada del problema y las inconveniencias causadas]\n\nDe acuerdo con la Ley de Protección al Consumidor, solicito [solución específica: reembolso, reemplazo, reparación, etc.] en un plazo no mayor a [número] días hábiles.\n\nAdjunto copia de [facturas, comprobantes, garantías, etc.] como respaldo de mi solicitud.\n\nEspero una pronta respuesta y solución satisfactoria a este inconveniente.\n\nAtentamente,\n\n[Tu nombre]",
      consejo: "Conserva una copia de la carta y todos los documentos relacionados. Si no recibes respuesta en el plazo indicado, puedes acudir a la entidad de protección al consumidor de tu localidad."
    },
    renuncia: {
      explicacion: "Para presentar tu renuncia a un empleo de manera formal, debes redactar una carta dirigida a tu superior o al departamento de recursos humanos, indicando claramente tu intención de renunciar y la fecha en que dejarás el puesto.",
      modelo: "[Lugar y fecha]\n\n[Nombre del destinatario]\n[Cargo del destinatario]\n[Nombre de la empresa]\n\nEstimado/a [Sr./Sra. Apellido]:\n\nPor medio de la presente, me dirijo a usted para presentar formalmente mi renuncia al cargo de [tu puesto actual] que he venido desempeñando en [nombre de la empresa], efectiva a partir del día [fecha de término - generalmente se da un preaviso de 2 semanas o según lo estipule tu contrato].\n\nQuiero expresar mi agradecimiento por la oportunidad de haber formado parte de esta organización durante [tiempo que trabajaste en la empresa], período en el cual he podido desarrollarme profesionalmente y adquirir valiosa experiencia.\n\nEstoy dispuesto/a a colaborar en lo que sea necesario para facilitar la transición de mis responsabilidades antes de mi partida.\n\nAgradezco su comprensión y le deseo éxitos en los futuros proyectos de la empresa.\n\nAtentamente,\n\n[Tu nombre completo]\n[Tu firma]\n[Tu información de contacto]",
      consejo: "Entrega tu carta de renuncia con suficiente anticipación según lo establecido en tu contrato o la legislación laboral. Mantén un tono profesional y positivo, independientemente de las razones de tu renuncia, ya que esto ayudará a mantener buenas referencias laborales."
    },
    contrato: {
      explicacion: "Para redactar un contrato de arrendamiento básico, debes incluir información sobre las partes involucradas, la propiedad, el plazo, el monto del alquiler y las condiciones generales del acuerdo.",
      modelo: "CONTRATO DE ARRENDAMIENTO\n\nEn [ciudad], a [fecha], entre:\n\nARRENDADOR: [Nombre completo], [nacionalidad], [estado civil], [profesión], con domicilio en [dirección], identificado con [tipo y número de documento].\n\nARRENDATARIO: [Nombre completo], [nacionalidad], [estado civil], [profesión], con domicilio en [dirección], identificado con [tipo y número de documento].\n\nLas partes convienen celebrar el presente contrato de arrendamiento sujeto a las siguientes cláusulas:\n\nPRIMERA: OBJETO\nEl ARRENDADOR da en arrendamiento al ARRENDATARIO el inmueble ubicado en [dirección completa de la propiedad], que consta de [descripción básica: número de habitaciones, baños, etc.].\n\nSEGUNDA: PLAZO\nEl plazo de duración del presente contrato es de [número] meses/años, comenzando el [fecha de inicio] y finalizando el [fecha de término].\n\nTERCERA: RENTA\nEl ARRENDATARIO pagará al ARRENDADOR una renta mensual de [monto en números y letras], pagadera por mes adelantado dentro de los primeros [número] días de cada mes, mediante [forma de pago].\n\nCUARTA: GARANTÍA\nEl ARRENDATARIO entrega al ARRENDADOR la suma de [monto en números y letras] en concepto de garantía, que será devuelta al finalizar el contrato, previa verificación del estado del inmueble.\n\nQUINTA: SERVICIOS\nLos servicios de [especificar: agua, luz, gas, internet, etc.] serán por cuenta del ARRENDATARIO.\n\nSEXTA: PROHIBICIONES\nEl ARRENDATARIO no podrá subarrendar ni ceder total o parcialmente el inmueble sin autorización escrita del ARRENDADOR.\n\nSÉPTIMA: CONSERVACIÓN\nEl ARRENDATARIO recibe el inmueble en buen estado y se compromete a devolverlo en iguales condiciones, salvo el desgaste natural por el uso normal.\n\nOCTAVA: RESOLUCIÓN DE CONFLICTOS\nCualquier controversia derivada de este contrato será resuelta mediante [especificar: mediación, arbitraje, tribunales ordinarios].\n\nEn prueba de conformidad, se firman dos ejemplares de igual tenor, en el lugar y fecha indicados.\n\n_________________       _________________\nFirma ARRENDADOR       Firma ARRENDATARIO",
      consejo: "Es recomendable que el contrato sea revisado por un abogado antes de firmarlo y que se realice un inventario detallado del estado de la propiedad y sus contenidos al momento de la entrega."
    },
    default: {
      explicacion: "He analizado tu consulta y te proporciono la siguiente información para ayudarte a resolver tu situación legal o administrativa.",
      modelo: "[Este documento es un modelo general que puedes adaptar según tu situación específica. Recuerda incluir todos los datos relevantes como fechas, nombres completos, referencias y cualquier otra información importante para tu caso particular.]\n\n[Fecha]\n\n[Destinatario/Entidad]\n[Dirección]\n\nAsunto: [Especifica el tema de tu documento]\n\n[Saludo formal]\n\n[Introducción: Explica brevemente el motivo de tu comunicación]\n\n[Desarrollo: Detalla la información relevante, hechos, fechas, referencias a documentos previos, etc.]\n\n[Solicitud/Conclusión: Especifica claramente lo que estás solicitando o la acción que esperas]\n\n[Despedida formal]\n\n[Tu nombre completo]\n[Tu información de contacto]\n[Tu firma]",
      consejo: "Te recomiendo guardar copias de todos los documentos relacionados con este asunto y, si la situación es compleja, considera consultar con un profesional especializado en el área correspondiente."
    }
  };
  
  // Determinar qué tipo de respuesta enviar según palabras clave
  if (pregunta.includes('escuela') || pregunta.includes('colegio') || pregunta.includes('hijo') || 
      pregunta.includes('niño') || pregunta.includes('estudiante') || pregunta.includes('retir')) {
    return respuestas.escuela;
  }
  
  if (pregunta.includes('reclamo') || pregunta.includes('queja') || pregunta.includes('defectuoso') || 
      pregunta.includes('devolver') || pregunta.includes('reembolso') || pregunta.includes('producto')) {
    return respuestas.reclamo;
  }
  
  if (pregunta.includes('renuncia') || pregunta.includes('trabajo') || pregunta.includes('empleo') || 
      pregunta.includes('dimitir') || pregunta.includes('dejar el puesto')) {
    return respuestas.renuncia;
  }
  
  if (pregunta.includes('contrato') || pregunta.includes('arrendamiento') || pregunta.includes('alquiler') || 
      pregunta.includes('renta') || pregunta.includes('propiedad') || pregunta.includes('inmueble')) {
    return respuestas.contrato;
  }
  
  return respuestas.default;
}

router.post('/', async (req, res) => {
  const { pregunta } = req.body;
  if (!pregunta) {
    return res.status(400).json({ error: 'La pregunta es obligatoria.' });
  }

  try {
    console.log('Recibida consulta:', pregunta);
    
    // Verificar si tenemos API key
    if (!process.env.OPENAI_API_KEY) {
      console.log('API key no configurada, usando respuesta local');
      return res.json(getRespuestaFallback(pregunta));
    }
    
    const prompt = `\nEres un asistente legal que responde en lenguaje claro. Para la siguiente consulta, responde en formato JSON con:\n1. \"explicacion\": Explicación clara y sencilla.\n2. \"modelo\": Un ejemplo de texto o nota que el usuario pueda copiar.\n3. \"consejo\": Consejo o aclaración adicional.\n\nConsulta: \"\"\"${pregunta}\"\"\"\n`;

    try {
      // Determinar el endpoint y headers según el tipo de API key
      let apiUrl = 'https://api.openai.com/v1/chat/completions';
      let headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      };
      
      // Si es una clave de proyecto (sk-proj-), usar respuesta de fallback
      if (process.env.OPENAI_API_KEY.startsWith('sk-proj-')) {
        console.log('API key de proyecto detectada, usando respuesta local');
        return res.json(getRespuestaFallback(pregunta));
      }
      
      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        { headers }
      );

      console.log('Respuesta recibida de OpenAI');
      
      let data;
      try {
        data = JSON.parse(response.data.choices[0].message.content);
      } catch (e) {
        console.log('Error al parsear JSON:', e.message);
        data = {
          explicacion: response.data.choices[0].message.content,
          modelo: '',
          consejo: ''
        };
      }

      res.json(data);
    } catch (apiError) {
      console.error('Error de API OpenAI:', apiError.message);
      if (apiError.response) {
        console.error('Detalles del error:', apiError.response.data);
      }
      // Usar respuesta de fallback en caso de error
      console.log('Usando respuesta de fallback debido a error de API');
      res.json(getRespuestaFallback(pregunta));
    }
  } catch (error) {
    console.error('Error general:', error.message);
    res.status(500).json({ error: 'Error al procesar la consulta: ' + error.message });
  }
});

export default router; 