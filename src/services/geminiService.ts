/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { RAPPI_DATA } from '../constants';

let aiClient: GoogleGenAI | null = null;

function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI Analyst will not work correctly.");
    }
    aiClient = new GoogleGenAI({ 
      apiKey: apiKey || "" 
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `Eres un analista de datos experto en disponibilidad de tiendas para Rappi.

DATOS DEL DASHBOARD:
- Período: ${RAPPI_DATA.stats.date_start} al ${RAPPI_DATA.stats.date_end} (${RAPPI_DATA.stats.days} días)
- Total de registros: ${RAPPI_DATA.stats.total_records}
- Promedio global: ${RAPPI_DATA.stats.avg_stores} tiendas
- Máximo absoluto: ${RAPPI_DATA.stats.max_stores} tiendas
- Mínimo absoluto: ${RAPPI_DATA.stats.min_stores} tiendas
- Mediana: ${RAPPI_DATA.stats.median_stores} tiendas
- Disponibilidad ponderada del periodo completo: ${RAPPI_DATA.stats.uptime_pct}%

RESUMEN DIARIO:
${RAPPI_DATA.daily.map(d => `${d.date}: min=${d.min}, avg=${d.avg}, max=${d.max}`).join('\n')}

Responde en el idioma del usuario. Usa los datos exactos. No inventes datos que no estén aquí. Eres profesional, conciso y aportas insights valiosos.
Usa markdown para dar formato a tus respuestas si es necesario.`;

export async function askAnalyst(message: string, lang: string = 'es', history: { role: "user" | "model", parts: [{ text: string }] }[] = []) {
  try {
    const ai = getAI();
    const chat = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\nResponde en el idioma: ${lang}.`,
        temperature: 0.7,
      },
    });

    const response = await chat;
    return response.text || "Lo siento, no pude procesar esa pregunta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocurrió un error al contactar al analista de IA. Por favor, intenta de nuevo.";
  }
}
