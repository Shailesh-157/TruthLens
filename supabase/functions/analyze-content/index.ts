import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    if (!content || typeof content !== "string") {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert fake news detection AI. Analyze the provided content and determine if it's real, fake, or unverified.

Your analysis should consider:
- Sensational or emotionally manipulative language
- Lack of credible sources or evidence
- Logical fallacies or inconsistencies
- Bias indicators and propaganda techniques
- Verifiable facts vs. opinions or speculation

Respond ONLY with valid JSON in this exact format:
{
  "truthScore": <number 0-100>,
  "classification": "<real|fake|unverified>",
  "analysis": "<detailed explanation of your findings>",
  "highlights": ["<concern 1>", "<concern 2>", ...]
}

Rules:
- truthScore: 0-100 (0=completely fake, 100=completely real)
- classification: "real" (70-100), "unverified" (50-69), "fake" (0-49)
- analysis: 2-4 sentences explaining your reasoning
- highlights: array of specific concerns found (2-5 items), empty array if none`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this content for misinformation:\n\n${content}` },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response from AI
    let result;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiResponse.match(/```\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : aiResponse;
      result = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Fetch Google Fact Check results
    let factCheckLinks = [
      { source: "FactCheck.org", url: "https://www.factcheck.org/" },
      { source: "Snopes", url: "https://www.snopes.com/" },
      { source: "AltNews (India)", url: "https://www.altnews.in/" },
      { source: "PIB Fact Check", url: "https://factcheck.pib.gov.in/" },
    ];

    const googleApiKey = Deno.env.get("GOOGLE_FACT_CHECK_API_KEY");
    if (googleApiKey) {
      try {
        const searchQuery = encodeURIComponent(content.substring(0, 200));
        const factCheckUrl = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${searchQuery}&key=${googleApiKey}`;
        const factCheckResponse = await fetch(factCheckUrl);
        
        if (factCheckResponse.ok) {
          const factCheckData = await factCheckResponse.json();
          console.log("Google Fact Check API response:", JSON.stringify(factCheckData));
          
          if (factCheckData.claims && factCheckData.claims.length > 0) {
            // Add Google Fact Check results to the beginning
            const googleResults = factCheckData.claims.slice(0, 3).map((claim: any) => ({
              source: claim.claimReview?.[0]?.publisher?.name || "Fact Checker",
              url: claim.claimReview?.[0]?.url || "#",
              rating: claim.claimReview?.[0]?.textualRating || "Unknown"
            }));
            factCheckLinks = [...googleResults, ...factCheckLinks];
          }
        } else {
          console.error("Google Fact Check API error:", factCheckResponse.status, await factCheckResponse.text());
        }
      } catch (error) {
        console.error("Google Fact Check API request failed:", error);
      }
    }

    return new Response(
      JSON.stringify({
        ...result,
        factCheckLinks,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-content function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
