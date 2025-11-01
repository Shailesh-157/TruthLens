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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-3xl py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/lobby")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lobby
          </Button>
          <div className="flex gap-4 items-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {currentIndex + 1} / {sampleNews.length}
            </Badge>
          </div>
        </div>

        {/* Timer */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold">Time Remaining: {timeLeft}s</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* News Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Is this news Real or Fake?</CardTitle>
            <CardDescription>Read carefully and make your decision</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">{currentNews.content}</p>
          </CardContent>
        </Card>

        {/* Voting Buttons */}
        {!showResult ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg border-2 border-green-500 hover:bg-green-500 hover:text-white"
              onClick={() => handleVote(true)}
            >
              <ThumbsUp className="mr-2 h-6 w-6" />
              Real News
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg border-2 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => handleVote(false)}
            >
              <ThumbsDown className="mr-2 h-6 w-6" />
              Fake News
            </Button>
          </div>
        ) : (
          <Card className={lastAnswer ? "border-green-500 border-2" : "border-red-500 border-2"}>
            <CardHeader>
              <CardTitle className={lastAnswer ? "text-green-600" : "text-red-600"}>
                {lastAnswer ? "✓ Correct!" : "✗ Incorrect"}
              </CardTitle>
              <CardDescription>
                This news is {currentNews.isReal ? "REAL" : "FAKE"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{currentNews.explanation}</p>
              <Button onClick={handleNext} className="w-full" size="lg">
                {currentIndex < sampleNews.length - 1 ? "Next Challenge" : "Finish"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Challenge;
