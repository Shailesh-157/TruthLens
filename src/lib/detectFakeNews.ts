import { supabase } from "@/integrations/supabase/client";

interface DetectionResult {
  truthScore: number;
  classification: "real" | "fake" | "unverified";
  analysis: string;
  factCheckLinks: Array<{ source: string; url: string }>;
  highlights: string[];
}

export async function detectFakeNews(content: string, type: "text" | "url"): Promise<DetectionResult> {
  try {
    const { data, error } = await supabase.functions.invoke("analyze-content", {
      body: { content },
    });

    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message || "Failed to analyze content");
    }

    if (!data) {
      throw new Error("No data returned from analysis");
    }

    return data as DetectionResult;
  } catch (error) {
    console.error("Detection error:", error);
    throw error;
  }
}
