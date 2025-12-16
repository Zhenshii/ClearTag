import { GoogleGenAI } from "@google/genai";
import { GradeResult } from "../types";

// NOTE: In a real production app, you might want to proxy this request through a backend
// to keep the API key hidden. For this frontend-only demo, we assume the key is in env.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export async function checkProduct(input: string, imageBase64?: string): Promise<GradeResult> {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const modelId = 'gemini-2.5-flash';

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
      "careInstructions": "Short, specific washing and drying instructions based on the fabric type (e.g., 'Machine wash cold, tumble dry low.').",
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

    // Attempt to extract JSON from the text response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsed = JSON.parse(jsonStr);
      return {
        ...parsed,
        sources
      } as GradeResult;
    } else {
        return {
            score: 0,
            grade: 'F',
            compositionAnalysis: "Could not determine composition",
            explanation: "The AI could not extract structured data. Please try again with a clearer photo or text description.",
            sources
        }
    }

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to analyze product. Please try again.");
  }
}