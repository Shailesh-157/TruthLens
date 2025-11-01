interface DetectionResult {
  truthScore: number;
  classification: "real" | "fake" | "unverified";
  analysis: string;
  factCheckLinks: Array<{ source: string; url: string }>;
  highlights: string[];
}

// Keywords that indicate potential misinformation
const SUSPICIOUS_KEYWORDS = [
  "100%", "miracle", "shocking", "secret", "they don't want you to know",
  "banned", "censored", "breaking", "urgent", "must read", "wake up",
  "exposed", "conspiracy", "hoax", "fake news", "mainstream media lies"
];

const EMOTIONAL_WORDS = [
  "outrage", "horrifying", "terrifying", "devastating", "shocking",
  "unbelievable", "explosive", "bombshell", "stunning"
];

export async function detectFakeNews(content: string, type: "text" | "url"): Promise<DetectionResult> {
  // Simulate API processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lowerContent = content.toLowerCase();
  let suspicionScore = 0;
  const highlights: string[] = [];

  // Check for suspicious keywords
  const foundSuspicious = SUSPICIOUS_KEYWORDS.filter(keyword => 
    lowerContent.includes(keyword.toLowerCase())
  );
  if (foundSuspicious.length > 0) {
    suspicionScore += foundSuspicious.length * 10;
    highlights.push(`Contains sensational language: "${foundSuspicious.join('", "')}"`)
  }

  // Check for excessive emotional language
  const foundEmotional = EMOTIONAL_WORDS.filter(word => 
    lowerContent.includes(word.toLowerCase())
  );
  if (foundEmotional.length > 2) {
    suspicionScore += 15;
    highlights.push("Uses excessive emotional manipulation tactics");
  }

  // Check for all caps (indicates sensationalism)
  const allCapsWords = content.split(/\s+/).filter(word => 
    word.length > 3 && word === word.toUpperCase()
  );
  if (allCapsWords.length > 3) {
    suspicionScore += 10;
    highlights.push("Excessive use of ALL CAPS for emphasis");
  }

  // Check for lack of sources (basic heuristic)
  if (!lowerContent.includes("source") && !lowerContent.includes("study") && 
      !lowerContent.includes("research") && !lowerContent.includes("according to")) {
    suspicionScore += 15;
    highlights.push("No credible sources or references cited");
  }

  // Calculate truth score (inverse of suspicion)
  const truthScore = Math.max(0, Math.min(100, 100 - suspicionScore));
  
  // Determine classification
  let classification: "real" | "fake" | "unverified";
  if (truthScore >= 70) {
    classification = "real";
  } else if (truthScore < 50) {
    classification = "fake";
  } else {
    classification = "unverified";
  }

  // Generate analysis
  let analysis = "";
  if (classification === "fake") {
    analysis = `Our AI analysis detected multiple indicators of potential misinformation in this content. The text shows signs of emotional manipulation, sensationalist language, and lacks credible source citations. We recommend verifying this information through trusted fact-checking sources before sharing.`;
  } else if (classification === "unverified") {
    analysis = `This content shows some characteristics that warrant caution. While not definitively false, it contains elements that suggest it should be verified through additional sources. Cross-reference with established fact-checkers before accepting as truth.`;
  } else {
    analysis = `Based on our analysis, this content appears relatively credible. It shows fewer indicators of misinformation tactics. However, always verify important claims through multiple trusted sources before sharing.`;
  }

  // Add fact-check links
  const factCheckLinks = [
    { source: "Google Fact Check", url: `https://www.google.com/search?q=${encodeURIComponent(content.slice(0, 100))}+fact+check` },
    { source: "FactCheck.org", url: "https://www.factcheck.org/" },
    { source: "Snopes", url: "https://www.snopes.com/" },
    { source: "AltNews (India)", url: "https://www.altnews.in/" },
    { source: "PIB Fact Check", url: "https://factcheck.pib.gov.in/" },
  ];

  return {
    truthScore,
    classification,
    analysis,
    factCheckLinks,
    highlights,
  };
}
