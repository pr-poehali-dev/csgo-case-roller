import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import SkinCard from "@/components/SkinCard";
import { Case, WeaponSkin } from "@/components/CaseCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Check, X, ChevronLeft, Share2, Sparkles } from "lucide-react";

// Import mock data
import { casesData } from "@/lib/mockData";

const CaseOpening = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [caseDetails, setCaseDetails] = useState<Case | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<WeaponSkin | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [items, setItems] = useState<WeaponSkin[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the case with the matching ID
    const foundCase = casesData.find(c => c.id === caseId);
    
    if (foundCase) {
      // Add price property to each skin item
      const caseWithPrices = {
        ...foundCase,
        items: foundCase.items.map(item => ({
          ...item,
          price: getRarityBasedPrice(item.rarity),
        }))
      };
      
      setCaseDetails(caseWithPrices);
      
      // Start spinning automatically after a short delay
      const timer = setTimeout(() => {
        startSpinning();
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // If case not found, redirect back to home
      navigate('/');
    }
  }, [caseId, navigate]);

  // Function to get a price based on rarity
  const getRarityBasedPrice = (rarity: string) => {
    const prices = {
      common: Math.floor(Math.random() * 300) + 50,
      uncommon: Math.floor(Math.random() * 500) + 300,
      rare: Math.floor(Math.random() * 1000) + 700,
      epic: Math.floor(Math.random() * 3000) + 1500,
      legendary: Math.floor(Math.random() * 10000) + 5000,
    };
    
    return prices[rarity as keyof typeof prices] || 100;
  };

  const startSpinning = () => {
    if (!caseDetails || spinning) return;
    
    setSpinning(true);
    setShowResult(false);
    
    // Generate random items for spinning animation
    // Enhanced with more items to make the animation look better
    const spinItems: WeaponSkin[] = [];
    
    // Generate many random items with more variety
    for (let i = 0; i < 80; i++) {
      // Pick random item from the case
      const randomItem = caseDetails.items[Math.floor(Math.random() * caseDetails.items.length)];
      spinItems.push({...randomItem});
    }
    
    // Choose the winning item
    // This uses a weighted random selection based on rarity
    const rarityWeights = {
      common: 70,
      uncommon: 20,
      rare: 7,
      epic: 2,
      legendary: 1
    };
    
    // Create weighted pool
    const pool: WeaponSkin[] = [];
    caseDetails.items.forEach(item => {
      const weight = rarityWeights[item.rarity as keyof typeof rarityWeights] || 1;
      for (let i = 0; i < weight; i++) {
        pool.push(item);
      }
    });
    
    // Select random item from weighted pool
    const winningItem = pool[Math.floor(Math.random() * pool.length)];
    
    // Add this winning item to a specific position near the end
    spinItems[75] = {...winningItem};
    
    setItems(spinItems);
    setResult(winningItem);
    
    // After the animation completes, show the result
    setTimeout(() => {
      setSpinning(false);
      setShowResult(true);
    }, 8000); // Timing should match the CSS animation duration
  };

  const handleGoToCase = () => {
    navigate(`/case/${caseId}`);
  };

  const handleTryAgain = () => {
    // Reset state and start again
    setShowResult(false);
    setResult(null);
    
    // Start spinning again instead of redirecting
    setTimeout(() => {
      startSpinning();
    }, 500);
  };

  const handleKeepSkin = () => {
    // Here you would implement adding the skin to the user's inventory
    // For now, just redirect back to the case
    navigate(`/case/${caseId}`);
  };

  if (!caseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container max-w-6xl mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <button
            onClick={handleGoToCase} 
            className="inline-flex items-center text-sm text-gray-400 hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Вернуться к кейсу</span>
          </button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 glow-text">{caseDetails.name}</h1>
          <p className="text-gray-400">Открываем кейс за <span className="text-primary font-bold">{caseDetails.price} ₽</span></p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="relative w-60 h-60">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent rounded-full blur-xl animate-pulse"></div>
            <img 
              src={caseDetails.image} 
              alt={caseDetails.name} 
              className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(155,135,245,0.5)] ${spinning ? 'animate-case-open' : ''}`}
            />
          </div>
        </div>
        
        {/* Enhanced spinner visuals */}
        <div className="relative overflow-hidden mb-20 mx-auto max-w-5xl rounded-lg bg-card/50 backdrop-blur-sm p-4 border border-primary/20">
          {/* Indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-[4px] h-full bg-primary">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 
                      border-l-[10px] border-l-transparent
                      border-r-[10px] border-r-transparent
                      border-t-[15px] border-t-primary"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/50 blur-sm"></div>
          </div>
          
          {/* Spotlight effect - enhanced */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 w-[100px] h-full pointer-events-none">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[30px] bg-white/30 blur-md"></div>
          </div>
          
          {/* Background animation for the slider area */}
          <div className="absolute inset-0 z-0 bg-[url('https://source.unsplash.com/random/1920x1080/?csgo,dark')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 animate-pulse"></div>
          
          {/* Side shadows */}
          <div className="absolute left-0 top-0 z-10 w-20 h-full bg-gradient-to-r from-background/80 to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 w-20 h-full bg-gradient-to-l from-background/80 to-transparent"></div>
          
          {/* Slider */}
          <div className="relative z-5 py-4 overflow-hidden">
            <div 
              ref={sliderRef}
              className={`flex transition-transform duration-[8000ms] ease-case-spin ${spinning ? 'case-slider-animate' : ''}`}
              style={{
                transform: spinning ? 'translateX(calc(-92.5%))' : 'translateX(0)'
              }}
            >
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 mx-1 w-36 transform transition-all duration-300 ${
                    // Add a subtle animation to the winning item when it passes the center
                    index === 75 && spinning ? 'scale-110 z-10 brightness-125' : ''
                  }`}
                >
                  <SkinCard skin={item} size="sm" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Speed lines effect */}
          {spinning && (
            <div className="absolute inset-0 z-15 pointer-events-none">
              <div className="h-full w-full overflow-hidden opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute h-[1px] bg-white/80" 
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 50 + 20}px`,
                      transform: `rotate(${Math.random() * 20 - 10}deg)`,
                      opacity: Math.random() * 0.5 + 0.5,
                      animation: `speedLine ${Math.random() * 1 + 0.5}s linear infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Information panel */}
        <div className="text-center mb-8">
          {spinning ? (
            <div className="animate-pulse">
              <p className="text-xl font-semibold mb-2">Выбираем ваш предмет...</p>
              <p className="text-sm text-gray-400">Удача решит, что вы получите!</p>
            </div>
          ) : (
            <Button
              onClick={startSpinning}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-[0_0_15px_rgba(155,135,245,0.5)] px-8"
            >
              Крутить снова за {caseDetails.price} ₽
            </Button>
          )}
        </div>
      </div>
      
      {/* Enhanced Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md border border-primary/50 bg-gradient-to-b from-card to-background shadow-[0_0_30px_rgba(155,135,245,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {result && result.rarity === 'legendary' ? (
                <span className="text-yellow-400 flex items-center justify-center gap-2 animate-pulse">
                  <Sparkles size={20} className="animate-spin" />
                  Невероятная удача!
                  <Sparkles size={20} className="animate-spin" />
                </span>
              ) : (
                "Ваш выигрыш!"
              )}
            </DialogTitle>
          </DialogHeader>
          
          {result && (
            <div className="flex flex-col items-center p-4">
              <div className="relative mb-6 transform transition-all duration-700 animate-fade-in">
                <div className={`absolute inset-0 bg-gradient-to-b from-${result.rarity === 'legendary' ? 'yellow' : 'primary'}-500/30 to-transparent rounded-full blur-xl animate-pulse`}></div>
                <div className="animate-float">
                  <SkinCard skin={result} size="lg" />
                </div>
                
                {/* Particles effect for legendary items */}
                {result.rarity === 'legendary' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-yellow-400"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.5 + 0.5,
                          boxShadow: '0 0 5px rgba(250, 204, 21, 0.8)',
                          animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-center mb-6">
                <p className="text-2xl font-bold glow-text">{result.name} | {result.skin}</p>
                <p className="text-primary text-xl font-bold mt-1">{result.price} ₽</p>
                <p className="text-sm text-gray-400 mt-2 capitalize">Редкость: {result.rarity}</p>
              </div>
              
              <div className="flex gap-4 mt-2">
                <Button 
                  onClick={() => handleTryAgain()} 
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X size={16} />
                  Еще раз
                </Button>
                <Button
                  onClick={() => {}} 
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-primary/10"
                >
                  <Share2 size={16} />
                  Поделиться
                </Button>
                <Button 
                  onClick={() => handleKeepSkin()} 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 flex items-center gap-2 shadow-[0_0_10px_rgba(155,135,245,0.5)]"
                >
                  <Check size={16} />
                  Забрать
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseOpening;
