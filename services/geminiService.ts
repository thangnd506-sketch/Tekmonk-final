
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { TripPlan, Language } from "../types";

export interface MapDiscoveryResult {
  text: string;
  places: {
    title: string;
    uri: string;
  }[];
}

/**
 * Generates a detailed trip plan for Vietnam using Gemini 3 Pro.
 */
export const generateTripPlan = async (params: {
  days: number;
  adults: number;
  children: number;
  destination: string;
  currentLocation: string; 
  budget: string;
  interests: string[];
  specificInterests?: string; 
  transport: string;
  accommodation: string;
}, lang: Language = 'vi'): Promise<TripPlan | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const langNote = lang === 'en' ? 'Respond strictly in English.' : 'Trả lời hoàn toàn bằng tiếng Việt.';
    
    const prompt = `Bạn là một chuyên gia lữ hành quốc tế. Hãy lập lịch trình chi tiết đi du lịch Việt Nam cho đoàn khách đi từ "${params.currentLocation}" đến "${params.destination}".
    Thông tin chuyến đi:
    - Thời gian: ${params.days} ngày.
    - Thành viên: ${params.adults} người lớn và ${params.children} trẻ em.
    - Tổng ngân sách dự kiến: ${params.budget} VNĐ.
    - Loại hình trải nghiệm mong muốn: ${params.interests.join(', ')}.
    - Yêu cầu trải nghiệm cụ thể từ người dùng: "${params.specificInterests || 'Không có yêu cầu đặc biệt'}".
    - Phương tiện di chuyển chính ưu tiên: ${params.transport}.
    - Chỗ ở mong muốn: ${params.accommodation}.
    
    YÊU CẦU ĐẶC BIỆT VỀ DI CHUYỂN:
    - Với mỗi địa điểm tham quan, hãy nêu rõ PHƯƠNG TIỆN CÔNG CỘNG cụ thể để đến đó (VD: Tuyến Bus 09, VinBus E01, Metro số 1, Tàu hỏa SE...). Hãy ghi rõ mã số tuyến xe/bus nếu có.
    
    YÊU CẦU CỰC KỲ QUAN TRỌNG VỀ TÀI CHÍNH:
    1. Tách biệt rõ ràng: Hãy tính toán riêng "Tổng tiền vé máy bay" (flightCost) cho cả đoàn.
    2. Tách biệt rõ ràng: Hãy tính toán riêng "Tổng tiền khách sạn" (hotelCost) cho cả đoàn.
    3. Giữ nguyên: Các chi phí tại mỗi địa điểm tham quan du lịch (ăn uống, vé vào cổng) vẫn để trong phần activities của từng ngày. Nếu điểm đó miễn phí hoặc không tốn tiền, hãy để cost = 0.
    
    YÊU CẦU VỀ LỘ TRÌNH:
    1. Bắt đầu lịch trình từ điểm xuất phát "${params.currentLocation}".
    2. Hoạt động phải phù hợp cho cả người lớn và trẻ em.
    3. Cung cấp lịch trình hàng ngày với địa điểm cụ thể, thời gian và chi phí ước tính (bằng VNĐ).
    4. Chi phí phải thực tế cho tổng số người (${params.adults + params.children} người).
    5. Đưa ra 3 lời khuyên quan trọng dành riêng cho hành trình này. ${langNote}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        description: { type: Type.STRING },
                        location: { type: Type.STRING },
                        cost: { type: Type.NUMBER, description: "Total cost for the entire group. Use 0 for free." },
                        publicTransport: { type: Type.STRING, description: "Specific bus/train line number or transport instruction to get here." }
                      },
                      required: ["time", "description", "location", "cost", "publicTransport"]
                    }
                  }
                },
                required: ["day", "activities"]
              }
            },
            flightCost: { type: Type.NUMBER },
            hotelCost: { type: Type.NUMBER },
            totalBudget: { type: Type.NUMBER },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["itinerary", "flightCost", "hotelCost", "totalBudget", "tips"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as TripPlan;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

/**
 * Provides AI transport advice based on origin, destination and distance.
 */
export const getTransportAdvice = async (origin: string, destination: string, distanceKm: number = 0, lang: Language = 'vi'): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Bạn là chuyên gia tư vấn di chuyển thực tế tại Việt Nam. 
    Người dùng muốn đi từ "${origin}" đến "${destination}".
    Khoảng cách: ${distanceKm.toFixed(1)} km.
    
    YÊU CẦU:
    1. Đưa ra lời khuyên tối ưu, ngắn gọn súc tích trong 2-3 câu. 
    2. HÃY NÊU RÕ CÁC TUYẾN XE BUS, MÃ SỐ BUS (VD: Bus 09, VinBus E01) hoặc các line Metro nếu có ở địa phương đó.
    3. Ưu tiên hướng dẫn đi phương tiện công cộng nếu khả thi và tiết kiệm.
    Ngôn ngữ: ${lang === 'en' ? 'English' : 'Tiếng Việt'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};

/**
 * Searches for places in Vietnam using Google Maps grounding.
 */
export const searchVietnamPlaces = async (query: string, location?: { lat: number, lng: number }, lang: Language = 'vi'): Promise<MapDiscoveryResult | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search for this in Vietnam: ${query}.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: location ? { latitude: location.lat, longitude: location.lng } : undefined
          }
        }
      },
    });

    const places = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.maps)
      ?.map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri
      })) || [];

    return {
      text: response.text || "",
      places: places
    };
  } catch (error) {
    return null;
  }
};

/**
 * Generates speech for a given text in Vietnamese.
 */
export const speakVietnamese = async (text: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Phát âm câu tiếng Việt này một cách tự nhiên: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    return null;
  }
};

/**
 * Evaluates user's pronunciation accuracy compared to a target phrase.
 */
export const evaluatePronunciation = async (targetPhrase: string, audioBase64: string, lang: Language = 'vi'): Promise<{ score: number, feedback: string } | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { text: `Evaluate pronunciation of "${targetPhrase}". Return JSON with score and feedback.` },
          { inlineData: { mimeType: 'audio/wav', data: audioBase64 } }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
          },
          required: ["score", "feedback"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return null;
  }
};
