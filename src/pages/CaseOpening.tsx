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
    // This creates an array with more items to make the animation look better
    const spinItems: WeaponSkin[] = [];
    
    // Generate many random items
    for (let i = 0; i < 50; i++) {
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
    spinItems[48] = {...winningItem};
    
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
    
    // Go back to the case page to try again
    navigate(`/case/${caseId}`);
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
          <h1 className="text-3xl font-bold mb-2">{caseDetails.name}</h1>
          <p className="text-gray-400">Открываем кейс за {caseDetails.price} ₽</p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="relative w-60 h-60">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent rounded-full blur-xl animate-pulse"></div>
            <img 
              src={caseDetails.image} 
              alt={caseDetails.name} 
              className={`w-full h-full object-contain ${spinning ? 'animate-case-open' : ''}`}
            />
          </div>
        </div>
        
        <div className="relative overflow-hidden mb-20 mx-auto max-w-5xl">
          {/* Indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-px h-full bg-primary">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 
                      border-l-[10px] border-l-transparent
                      border-r-[10px] border-r-transparent
                      border-t-[15px] border-t-primary"></div>
          </div>
          
          {/* Spotlight effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-5 w-24 h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          {/* Slider */}
          <div 
            ref={sliderRef}
            className={`flex transition-transform duration-[8000ms] ease-case-spin ${spinning ? 'case-slider-animate' : ''}`}
            style={{
              transform: spinning ? 'translateX(calc(-92.5%))' : 'translateX(0)'
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0 mx-1 w-36">
                <SkinCard skin={item} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md border border-primary/50 bg-gradient-to-b from-card to-background">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {result && result.rarity === 'legendary' ? (
                <span className="text-yellow-400 flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  Невероятная удача!
                  <Sparkles size={20} />
                </span>
              ) : (
                "Ваш выигрыш!"
              )}
            </DialogTitle>
          </DialogHeader>
          
          {result && (
            <div className="flex flex-col items-center p-4">
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-b from-${result.rarity === 'legendary' ? 'yellow' : 'primary'}-500/30 to-transparent rounded-full blur-xl animate-pulse`}></div>
                <SkinCard skin={result} size="lg" />
              </div>
              
              <div className="text-center mb-6">
                <p className="text-2xl font-bold">{result.name} | {result.skin}</p>
                <p className="text-primary text-xl font-bold mt-1">{result.price} ₽</p>
                <p className="text-sm text-gray-400 mt-2 capitalize">Редкость: {result.rarity}</p>
              </div>
              
              <div className="flex gap-4 mt-2">
                <Button 
                  onClick={() => handleTryAgain()} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <X size={16} />
                  Еще раз
                </Button>
                <Button
                  onClick={() => {}} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Поделиться
                </Button>
                <Button 
                  onClick={() => handleKeepSkin()} 
                  className="bg-gradient-to-r from-primary to-secondary flex items-center gap-2"
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
