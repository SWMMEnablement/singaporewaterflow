import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Award, Download, Printer, Star, Droplets } from "lucide-react";

interface CompletionCertificateProps {
  isOpen: boolean;
  onClose: () => void;
  totalChallenges: number;
  bestTimes: Record<number, number>;
}

export const CompletionCertificate = ({
  isOpen,
  onClose,
  totalChallenges,
  bestTimes,
}: CompletionCertificateProps) => {
  const [playerName, setPlayerName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const completionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate total stars earned
  const getTotalStars = () => {
    let stars = 0;
    Object.entries(bestTimes).forEach(([id, time]) => {
      const challengeId = parseInt(id);
      if (time <= 30) stars += 3;
      else if (time <= 60) stars += 2;
      else stars += 1;
    });
    return stars;
  };

  // HTML escape function to prevent XSS in print window
  const escapeHtml = (text: string): string => {
    const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
  };

  const handlePrint = () => {
    const printContent = certificateRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Escape all dynamic values for safe HTML insertion
    const safeName = escapeHtml(playerName || "Young Engineer");
    const safeTitle = escapeHtml(`Drainage Engineer Certificate - ${playerName || "Young Engineer"}`);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${safeTitle}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Nunito', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f0f9ff;
              padding: 20px;
            }
            
            .certificate {
              width: 800px;
              padding: 40px;
              background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
              border: 8px solid #0ea5e9;
              border-radius: 16px;
              text-align: center;
              position: relative;
              box-shadow: 0 20px 60px rgba(14, 165, 233, 0.2);
            }
            
            .certificate::before {
              content: '';
              position: absolute;
              inset: 8px;
              border: 2px dashed #0ea5e9;
              border-radius: 8px;
              pointer-events: none;
            }
            
            .water-drops {
              display: flex;
              justify-content: center;
              gap: 8px;
              margin-bottom: 16px;
            }
            
            .drop {
              width: 24px;
              height: 24px;
              background: linear-gradient(135deg, #38bdf8, #0ea5e9);
              border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            }
            
            .title {
              font-size: 36px;
              font-weight: 800;
              color: #0369a1;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            
            .subtitle {
              font-size: 18px;
              color: #64748b;
              margin-bottom: 32px;
            }
            
            .presented-to {
              font-size: 14px;
              color: #94a3b8;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin-bottom: 8px;
            }
            
            .name {
              font-size: 48px;
              font-weight: 800;
              color: #0c4a6e;
              margin-bottom: 24px;
              padding-bottom: 8px;
              border-bottom: 3px solid #0ea5e9;
              display: inline-block;
            }
            
            .achievement {
              font-size: 18px;
              color: #334155;
              margin-bottom: 24px;
              line-height: 1.6;
            }
            
            .stats {
              display: flex;
              justify-content: center;
              gap: 40px;
              margin-bottom: 32px;
            }
            
            .stat {
              text-align: center;
            }
            
            .stat-value {
              font-size: 32px;
              font-weight: 800;
              color: #0ea5e9;
            }
            
            .stat-label {
              font-size: 12px;
              color: #64748b;
              text-transform: uppercase;
            }
            
            .stars {
              display: flex;
              justify-content: center;
              gap: 4px;
              margin-top: 4px;
            }
            
            .star {
              width: 16px;
              height: 16px;
              background: #eab308;
              clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            }
            
            .date-section {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
            }
            
            .date {
              text-align: left;
            }
            
            .date-label {
              font-size: 10px;
              color: #94a3b8;
              text-transform: uppercase;
            }
            
            .date-value {
              font-size: 14px;
              color: #334155;
              font-weight: 600;
            }
            
            .seal {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: 800;
              font-size: 10px;
              text-transform: uppercase;
              box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
            }
            
            .seal-icon {
              font-size: 24px;
              margin-bottom: 2px;
            }
            
            @media print {
              body {
                background: white;
              }
              .certificate {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="water-drops">
              <div class="drop"></div>
              <div class="drop"></div>
              <div class="drop"></div>
            </div>
            <h1 class="title">Certificate of Achievement</h1>
            <p class="subtitle">Singapore Drainage Engineering Academy</p>
            
            <p class="presented-to">This is to certify that</p>
            <h2 class="name">${escapeHtml(playerName || "Young Engineer")}</h2>
            
            <p class="achievement">
              Has successfully completed all <strong>${escapeHtml(String(totalChallenges))} drainage challenges</strong><br>
              and demonstrated exceptional skills in water management engineering!
            </p>
            
            <div class="stats">
              <div class="stat">
                <div class="stat-value">${totalChallenges}</div>
                <div class="stat-label">Challenges</div>
              </div>
              <div class="stat">
                <div class="stat-value">${getTotalStars()}</div>
                <div class="stat-label">Stars Earned</div>
                <div class="stars">
                  ${Array(Math.min(5, Math.floor(getTotalStars() / 6))).fill('<div class="star"></div>').join('')}
                </div>
              </div>
            </div>
            
            <div class="date-section">
              <div class="date">
                <div class="date-label">Date Completed</div>
                <div class="date-value">${completionDate}</div>
              </div>
              <div class="seal">
                <span class="seal-icon">🏆</span>
                <span>Master</span>
                <span>Engineer</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleDownload = () => {
    // Create a canvas-based download
    handlePrint(); // For now, use print as download method
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-yellow-500" />
            🎉 Congratulations, Master Engineer!
          </DialogTitle>
        </DialogHeader>

        {!showCertificate ? (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Award className="w-12 h-12 text-white" />
              </div>
              <p className="text-muted-foreground">
                You've completed all {totalChallenges} drainage challenges! 
                Enter your name to create your personalized certificate.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name</label>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name..."
                className="text-center text-lg"
                maxLength={30}
              />
            </div>

            <Button
              onClick={() => setShowCertificate(true)}
              className="w-full gap-2"
              disabled={!playerName.trim()}
            >
              Create My Certificate <Star className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Certificate Preview */}
            <div
              ref={certificateRef}
              className="relative p-6 bg-gradient-to-br from-background to-primary/5 border-4 border-primary rounded-xl text-center"
            >
              <div className="absolute inset-2 border-2 border-dashed border-primary/30 rounded-lg pointer-events-none" />
              
              <div className="flex justify-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-primary" />
                <Droplets className="w-5 h-5 text-primary" />
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-primary mb-1">
                Certificate of Achievement
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Singapore Drainage Engineering Academy
              </p>
              
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                This is to certify that
              </p>
              <h4 className="font-display text-2xl font-bold text-foreground mb-3 border-b-2 border-primary pb-1 inline-block">
                {playerName}
              </h4>
              
              <p className="text-sm text-muted-foreground mb-4">
                Has completed all <strong>{totalChallenges} challenges</strong><br />
                with exceptional engineering skills!
              </p>
              
              <div className="flex justify-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalChallenges}</div>
                  <div className="text-[10px] text-muted-foreground">CHALLENGES</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{getTotalStars()}</div>
                  <div className="text-[10px] text-muted-foreground">STARS</div>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= Math.floor(getTotalStars() / 6)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-end pt-3 border-t border-border">
                <div className="text-left">
                  <div className="text-[8px] text-muted-foreground uppercase">Date</div>
                  <div className="text-xs font-medium">{completionDate}</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🏆</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowCertificate(false)} className="flex-1">
                Edit Name
              </Button>
              <Button onClick={handlePrint} className="flex-1 gap-2">
                <Printer className="w-4 h-4" />
                Print Certificate
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              💡 Tip: Use "Save as PDF" in the print dialog to download!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
