import { GoogleGenAI } from "@google/genai";
import { GradeResult } from "../types";

/**
 * Analyzes a product using Gemini AI.
 * This service uses the @google/genai SDK as required by the environment.
 */
export async function checkProduct(input: string, imageBase64?: string): Promise<GradeResult> {
  // Always use this exact initialization pattern as per platform requirements.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-flash-preview for high-performance and cost-effective mobile analysis.
  const modelId = 'gemini-3-flash-preview';

  const systemInstruction = `
    You are ClearTag AI, an expert in sustainable fashion, textile science, and fabric composition. 
    Your goal is to analyze product information provided by the user and determine its fabric composition and sustainability grade.
    
    The user may provide text (URL, Name, Description) OR an image (Product Label, Barcode, or the Item itself).
    
    If an IMAGE is provided:
    1. Look for a **Fabric Composition Label** (e.g., "100% Cotton"). Read the text exactly.
    2. Look for a **Barcode**. If readable, try to identify the product code.
    3. Look for the product itself. Identify the item type (e.g., "Denim Jeans").
    
    If TEXT is provided:
    - Use Google Search to find the specific fabric composition if it is a product name.
    - Analyze the composition string directly if provided.

    Grading Criteria:
    - Score (0-100):
      - 100: 100% Natural Organic fibers (GOTS Cotton, Linen, Hemp).
      - 90-99: 100% Natural conventional fibers.
      - 70-89: Mostly natural (>80%) or high-quality semi-synthetics (Tencel/Lyocell).
      - 50-69: Blends with significant synthetic content (e.g. 60% Cotton / 40% Poly).
      - <50: Majority synthetic (Polyester, Acrylic, Nylon) or virgin synthetics.
    - Grade (A, B, C, D, F): derived roughly from the score.
    
    Output Format:
    Return a strictly valid JSON object. Do not include markdown code blocks. The JSON must match this structure:
    {
      "productName": "Extracted Name or 'Unknown Product'",
      "score": 85,
      "grade": "B",
      "compositionAnalysis": "e.g. 100% Organic Cotton (detected from label)",
      "careInstructions": "Short, specific washing and drying instructions based on the fabric type.",
      "explanation": "A short 1-2 sentence explanation of why it got this grade."
    }
  `;

  try {
    const parts: any[] = [];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64
        }
      });
      parts.push({
        text: "Analyze this image. If it's a label, read the composition. If it's a barcode or product, identify it."
      });
    }

    if (input) {
      parts.push({
        text: `Additional Context/Input: "${input}"`
      });
    }

    // Call the model using the recommended generateContent pattern.
    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || '';
    
    // Extract grounding sources for transparency.
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.flatMap(chunk => 
      chunk.web?.uri ? [{ title: chunk.web.title || 'Source', uri: chunk.web.uri }] : []
    ) || [];

    // Extract JSON from the potentially conversational model output.
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ...parsed,
        sources
      } as GradeResult;
    } else {
        return {
            score: 0,
            grade: 'F',
            compositionAnalysis: "Could not analyze",
            explanation: "The AI analysis did not return clear results. Try providing a clearer label photo or the direct product link.",
            sources
        }
    }

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    
    // Map common mobile fetch/network errors to friendly messages.
    const msg = error.message || String(error);
    if (msg.toLowerCase().includes('fetch') || msg.toLowerCase().includes('network')) {
       throw new Error("Network error. Please check your internet connection and try again.");
    }
    
    throw new Error("Unable to analyze product at this time. Please try again later.");
  }
}