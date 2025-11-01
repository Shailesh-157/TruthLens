import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Clock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Sample news items for demo
const sampleNews = [
  {
    id: 1,
    content: "Scientists discover new species of dolphin in Amazon River with unique pink coloring and advanced echolocation capabilities.",
    isReal: true,
    explanation: "This is based on real discoveries. The Amazon river dolphin (boto) is indeed pink and has remarkable echolocation abilities."
  },
  {
    id: 2,
    content: "Breaking: World leaders announce plan to move United Nations headquarters to Mars by 2025.",
    isReal: false,
    explanation: "This is fake news. No such plan exists, and moving the UN headquarters to Mars by 2025 is technologically impossible."
  },
  {
    id: 3,
    content: "Study shows that drinking 8 glasses of water daily can improve memory and cognitive function by 23%.",
    isReal: true,
    explanation: "Multiple peer-reviewed studies support the link between proper hydration and cognitive performance."
  }
];

const Challenge = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);

  const currentNews = sampleNews[currentIndex];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }
  }, [timeLeft, showResult]);

  const handleTimeout = () => {
    setShowResult(true);
    toast.error("Time's up!");
  };

  const handleVote = (votedReal: boolean) => {
    const isCorrect = votedReal === currentNews.isReal;
    setLastAnswer(isCorrect);
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 100);
      toast.success("Correct! +100 points");
    } else {
      toast.error("Wrong answer!");
    }
  };

  const handleNext = () => {
    if (currentIndex < sampleNews.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(30);
      setShowResult(false);
      setLastAnswer(null);
    } else {
      toast.success(`Challenge complete! Final score: ${score}`);
      navigate("/lobby");
    }
  };

  const progressPercentage = ((timeLeft / 30) * 100);

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-2xl py-8 space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/lobby")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2 text-sm">
            <Badge variant="secondary">Score: {score}</Badge>
            <Badge variant="outline">{currentIndex + 1}/{sampleNews.length}</Badge>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {timeLeft}s
              </span>
              <Progress value={progressPercentage} className="h-1 w-32" />
            </div>
            
            <p className="text-lg py-4">{currentNews.content}</p>

            {!showResult ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleVote(true)}
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleVote(false)}
                >
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t">
                <div className={lastAnswer ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {lastAnswer ? "✓ Correct" : "✗ Wrong"} - This is {currentNews.isReal ? "REAL" : "FAKE"}
                </div>
                <p className="text-sm text-muted-foreground">{currentNews.explanation}</p>
                <Button onClick={handleNext} className="w-full">
                  {currentIndex < sampleNews.length - 1 ? "Next" : "Finish"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Challenge;
