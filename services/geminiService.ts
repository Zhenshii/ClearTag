import { GoogleGenAI } from "@google/genai";
import { GradeResult, FitCheckConfig } from "../types";

/**
 * Analyzes a product using Gemini AI.
 * This service uses the @google/genai SDK as required by the environment.
 */
export async function checkProduct(
  input: string, 
  imageBase64?: string, 
  fitCheck?: FitCheckConfig
): Promise<GradeResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = 'gemini-3-flash-preview';

  let systemInstruction = `
    You are ClearTag AI, an expert in sustainable fashion and textile science. 
    Analyze product info (text/image) to determine fabric composition and sustainability grade.
    
    If TEXT/URL provided: Use Google Search to find specific fabric composition.
    
    Grading:
    - Score (0-100): 100=Organic Natural, 90=Conventional Natural, 70=Lyocell/Semi-syn blends, <50=Majority Synthetic.
    - Grade (A, B, C, D, F).

    Output Format: Strict JSON.
    {
      "productName": "Product Name",
      "score": 85,
      "grade": "B",
      "compositionAnalysis": "Fabric details",
      "careInstructions": "Short wash/dry guide",
      "explanation": "Why this grade?",
      "fitVerdict": "OPTIONAL: If fit check requested, summarize sizing based on reviews vs user stats."
    }
  `;

  if (fitCheck?.includeFitCheck) {
    const stats = [
      fitCheck.height ? `Height: ${fitCheck.height}` : null,
      fitCheck.weight ? `Weight: ${fitCheck.weight}` : null,
      fitCheck.waist ? `Waist: ${fitCheck.waist}` : null,
      fitCheck.bustChest ? `Bust/Chest: ${fitCheck.bustChest}` : null,
      fitCheck.inseam ? `Inseam: ${fitCheck.inseam}` : null,
      `Target Size: ${fitCheck.desiredSize}`
    ].filter(Boolean).join(', ');

    systemInstruction += `
      FIT CHECK REQUESTED:
      User Stats: ${stats}.
      Use Google Search to find customer reviews, sizing charts, or "true to fit" data for this specific product. 
      Analyze if the requested size (${fitCheck.desiredSize}) will fit based on the provided measurements. 
      Note if it runs small, large, long, or tight in specific areas mentioned (like chest or waist).
      Provide a concise and helpful 'fitVerdict'.
    `;
  }

  try {
    const parts: any[] = [];
    
    if (imageBase64) {
      parts.push({
        inlineData: { mimeType: 'image/jpeg', data: imageBase64 }
      });
      parts.push({ text: "Analyze this image for fabric labels or product identification." });
    }

    let userPrompt = input;
    if (fitCheck?.includeFitCheck) {
      userPrompt += ` | Fit Check stats: Desired Size ${fitCheck.desiredSize}, Height ${fitCheck.height || 'N/A'}, Weight ${fitCheck.weight || 'N/A'}, Waist ${fitCheck.waist || 'N/A'}, Bust/Chest ${fitCheck.bustChest || 'N/A'}, Inseam ${fitCheck.inseam || 'N/A'}.`;
    }

    parts.push({ text: `Product Context: "${userPrompt}"` });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || '';
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.flatMap(chunk => 
      chunk.web?.uri ? [{ title: chunk.web.title || 'Source', uri: chunk.web.uri }] : []
    ) || [];

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return { ...parsed, sources } as GradeResult;
    } else {
      return {
        score: 0,
        grade: 'F',
        compositionAnalysis: "Analysis failed",
        explanation: "Could not parse JSON response from AI.",
        sources
      };
    }
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    throw new Error("Unable to analyze product. Please check connection and try again.");
  }
}