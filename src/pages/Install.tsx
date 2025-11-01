import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, CheckCircle } from "lucide-react";

const Install = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setInstallPrompt(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <Smartphone className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="mb-4 text-3xl font-bold">Install TruthLens</h1>
        <p className="mb-8 text-muted-foreground">
          Install TruthLens on your device for quick access and a better experience.
        </p>

        {isInstalled ? (
          <div className="space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-semibold">App Installed!</p>
            <p className="text-muted-foreground">
              You can now access TruthLens from your home screen.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Open App
            </Button>
          </div>
        ) : installPrompt ? (
          <Button onClick={handleInstallClick} size="lg" className="w-full">
            <Download className="mr-2 h-5 w-5" />
            Install Now
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To install this app on your device:
            </p>
            <div className="space-y-2 text-left text-sm">
              <p className="font-semibold">On iPhone/iPad:</p>
              <ol className="ml-4 list-decimal space-y-1">
                <li>Tap the Share button</li>
                <li>Select "Add to Home Screen"</li>
              </ol>
              
              <p className="font-semibold mt-4">On Android:</p>
              <ol className="ml-4 list-decimal space-y-1">
                <li>Tap the menu (⋮)</li>
                <li>Select "Add to Home screen"</li>
              </ol>
            </div>
            <Button onClick={() => (window.location.href = "/")} variant="outline" className="w-full mt-4">
              Continue to App
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Install;
