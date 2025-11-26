import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

// Initialize the client. 
// Note: In a production environment, you should proxy these requests through a backend 
// to keep the API key secure. For this demo, we use the env var directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Gabby", the intelligent sales assistant for GabNork Tech.
Your goal is to help customers find the perfect tech products, answer questions about specs, and guide them to checkout.

Context:
We are a premium tech retailer in Nigeria.
All prices are in Naira (NGN).
We offer installment payments and pay-on-delivery for orders under ₦200,000.

Our Product Catalog:
${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, price: p.price, category: p.category, id: p.id, description: p.description })))}

Guidelines:
1. Be polite, professional, and tech-savvy.
2. Recommend products from our catalog based on user needs.
3. If a user asks for a product we don't have, politely suggest the closest alternative from our catalog.
4. Keep responses concise (under 100 words) unless a detailed comparison is asked.
5. Use formatting (bullet points) for readability.
`;

let chatSession: Chat | null = null;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({
      message
    });

    return response.text || "I'm having trouble connecting to the server right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm currently experiencing high traffic. Please try again in a moment.";
  }
};
