// Enhanced Multi-Language Chatbot Library
import { generateWithGemini } from "./ai_gemini";
import { translateSystemPrompt, getContextualHelp, detectLanguage } from "./multilang";
import type { ChatbotMessage, ChatSession, ContextualHelp } from "@/types/chat";

export class MultiLanguageChatbot {
  private sessions: Map<string, ChatSession> = new Map();

  async processMessage(
    message: string,
    sessionId?: string,
    language: string = "en",
    context?: {
      feature?: string;
      user_type: "consumer" | "seller" | "admin";
      active_complaint_id?: string;
      active_verification_id?: string;
    }
  ): Promise<{
    response: string;
    session_id: string;
    quick_actions?: { label: string; action: string }[];
    contextual_help?: ContextualHelp;
  }> {
    
    // Auto-detect language if not provided
    const detectedLang = detectLanguage(message);
    const finalLanguage = detectedLang !== "en" ? detectedLang : language;

    // Get or create session
    let session = sessionId ? this.sessions.get(sessionId) : null;
    if (!session) {
      session = this.createNewSession(finalLanguage, context);
      this.sessions.set(session.id, session);
    }

    // Add user message to session
    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date().toISOString(),
      language: finalLanguage,
      context
    };
    session.messages.push(userMessage);

    // Prepare conversation context for AI
    const conversationContext = this.buildConversationContext(session, message);
    const systemPrompt = this.buildSystemPrompt(finalLanguage, context);

    try {
      // Generate AI response
      const aiResponse = await generateWithGemini(
        session.messages.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        })),
        systemPrompt
      );

      // Add AI response to session
      const assistantMessage: ChatbotMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date().toISOString(),
        language: finalLanguage,
        context
      };
      session.messages.push(assistantMessage);

      // Update session activity
      session.last_activity = new Date().toISOString();

      // Generate quick actions and contextual help
      const quickActions = this.generateQuickActions(message, context, finalLanguage);
      const contextualHelp = context?.feature ? getContextualHelp(context.feature, finalLanguage) : undefined;

      return {
        response: aiResponse,
        session_id: session.id,
        quick_actions: quickActions,
        contextual_help: contextualHelp || undefined
      };

    } catch (error) {
      console.error("Chatbot error:", error);
      
      // Fallback response in user's language
      const fallbackResponse = this.getFallbackResponse(finalLanguage);
      
      const errorMessage: ChatbotMessage = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        role: "assistant", 
        timestamp: new Date().toISOString(),
        language: finalLanguage
      };
      session.messages.push(errorMessage);

      return {
        response: fallbackResponse,
        session_id: session.id
      };
    }
  }

  private createNewSession(
    language: string,
    context?: {
      feature?: string;
      user_type: "consumer" | "seller" | "admin";
      active_complaint_id?: string;
      active_verification_id?: string;
    }
  ): ChatSession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: sessionId,
      user_id: "current_user", // In real app, get from auth
      language,
      started_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
      context: {
        current_feature: context?.feature,
        user_type: context?.user_type || "consumer",
        active_complaint_id: context?.active_complaint_id,
        active_verification_id: context?.active_verification_id
      },
      messages: []
    };
  }

  private buildSystemPrompt(
    language: string,
    context?: {
      feature?: string;
      user_type: "consumer" | "seller" | "admin";
      active_complaint_id?: string;
      active_verification_id?: string;
    }
  ): string {
    let basePrompt = translateSystemPrompt(language);
    
    // Add context-specific instructions
    if (context?.feature) {
      const featureInstructions = {
        scanner: "Focus on helping with product scanning, OCR text extraction, and barcode scanning. Guide users through the scanning process step by step.",
        price_manipulation: "Help users understand price manipulation detection, explain risk scores, and guide them through price analysis features.",
        verification: "Assist with product verification processes, document uploads, and dispute resolution. Explain verification types and requirements.",
        complaints: "Guide users through the complaint filing process, help them gather evidence, and explain resolution procedures.",
        compliance: "Explain legal metrology requirements, help interpret compliance rules, and guide users through compliance checking."
      };
      
      const instruction = featureInstructions[context.feature as keyof typeof featureInstructions];
      if (instruction) {
        basePrompt += `\n\nCurrent context: ${instruction}`;
      }
    }

    if (context?.user_type) {
      const userTypeInstructions = {
        consumer: "You are helping a consumer who wants to verify products, check prices, or file complaints. Focus on consumer protection and rights.",
        seller: "You are helping a seller/business who needs to ensure compliance, verify products, or handle customer disputes. Focus on business compliance requirements.",
        admin: "You are helping an administrator who manages the system. Provide detailed technical information and system insights."
      };
      
      basePrompt += `\n\nUser type: ${userTypeInstructions[context.user_type]}`;
    }

    return basePrompt;
  }

  private buildConversationContext(session: ChatSession, currentMessage: string): string {
    // Analyze recent messages for context
    const recentMessages = session.messages.slice(-5);
    
    let context = "";
    
    // Check for specific intents
    if (this.containsIntent(currentMessage, ["scan", "scanning", "product scan"])) {
      context += "User wants help with product scanning. ";
    }
    
    if (this.containsIntent(currentMessage, ["complaint", "complain", "issue", "problem"])) {
      context += "User wants to file a complaint or report an issue. ";
    }
    
    if (this.containsIntent(currentMessage, ["price", "cost", "expensive", "manipulation"])) {
      context += "User has questions about pricing or price analysis. ";
    }
    
    if (this.containsIntent(currentMessage, ["verify", "verification", "authentic", "fake"])) {
      context += "User wants to verify product authenticity. ";
    }

    return context;
  }

  private containsIntent(message: string, keywords: string[]): boolean {
    const lowerMessage = message.toLowerCase();
    return keywords.some(keyword => lowerMessage.includes(keyword));
  }

  private generateQuickActions(
    message: string,
    context?: {
      feature?: string;
      user_type: "consumer" | "seller" | "admin";
    },
    language: string = "en"
  ): { label: string; action: string }[] {
    const actions: { label: string; action: string }[] = [];
    
    // Feature-specific quick actions
    if (context?.feature === "scanner") {
      actions.push(
        { label: "Start Scanning", action: "start_scan" },
        { label: "Upload Image", action: "upload_image" },
        { label: "Scan Barcode", action: "scan_barcode" }
      );
    } else if (context?.feature === "verification") {
      actions.push(
        { label: "Start Verification", action: "start_verification" },
        { label: "Check Status", action: "check_status" },
        { label: "Upload Documents", action: "upload_docs" }
      );
    } else if (context?.feature === "price_manipulation") {
      actions.push(
        { label: "Analyze Price", action: "analyze_price" },
        { label: "View Alerts", action: "view_alerts" },
        { label: "Report Manipulation", action: "report_manipulation" }
      );
    } else {
      // General actions based on message content
      if (this.containsIntent(message, ["scan", "scanning"])) {
        actions.push({ label: "Go to Scanner", action: "navigate_scanner" });
      }
      
      if (this.containsIntent(message, ["complaint", "complain"])) {
        actions.push({ label: "File Complaint", action: "navigate_complaints" });
      }
      
      if (this.containsIntent(message, ["verify", "verification"])) {
        actions.push({ label: "Start Verification", action: "navigate_verification" });
      }
    }

    return actions;
  }

  private getFallbackResponse(language: string): string {
    const fallbacks = {
      en: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or you can navigate to the specific feature you need help with.",
      hi: "माफ करें, मुझे अभी कनेक्शन में समस्या हो रही है। कृपया कुछ देर बाद पुनः प्रयास करें, या आप जिस विशिष्ट सुविधा की सहायता चाहते हैं वहां जा सकते हैं।",
      bn: "দুঃখিত, আমার এখন সংযোগে সমস্যা হচ্ছে। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন, বা আপনি যে নির্দিষ্ট বৈশিষ্ট্যের সাহায্য চান সেখানে যেতে পারেন।",
      ta: "மன்னிக்கவும், எனக்கு இப்போது இணைப்பில் சிக்கல் உள்ளது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும், அல்லது நீங்கள் உதவி தேவைப்படும் குறிப்பிட்ட அம்சத்திற்குச் செல்லலாம்।"
    };
    
    return fallbacks[language as keyof typeof fallbacks] || fallbacks.en;
  }

  // Session management methods
  getSession(sessionId: string): ChatSession | null {
    return this.sessions.get(sessionId) || null;
  }

  clearSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  clearOldSessions(maxAgeHours: number = 24): number {
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - maxAgeHours);
    
    let cleared = 0;
    for (const [sessionId, session] of this.sessions.entries()) {
      if (new Date(session.last_activity) < cutoff) {
        this.sessions.delete(sessionId);
        cleared++;
      }
    }
    
    return cleared;
  }
}

// Export singleton instance
export const chatbot = new MultiLanguageChatbot();