import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpgradeCard from "@/components/UpgradeCard";
import UpgradeHistory from "@/components/UpgradeHistory";
import { WeaponSkin } from "@/components/CaseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Package, Package2 } from "lucide-react";

// Sample data for user inventory
const userInventory: WeaponSkin[] = [
  { name: "AK-47", skin: "Elite Build", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,9" },
  { name: "P250", skin: "Supernova", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,10" },
  { name: "Glock-18", skin: "Dragon Tattoo", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,11" },
  { name: "M4A4", skin: "Evil Daimyo", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,12" },
  { name: "AK-47", skin: "Redline", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,rifle,8" },
  { name: "M4A1-S", skin: "Hyper Beast", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,rifle,5" },
];

// Sample data for target skins
const targetSkinsPool: WeaponSkin[] = [
  { name: "AWP", skin: "Asiimov", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,sniper,2" },
  { name: "AK-47", skin: "Vulcan", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,rifle,1" },
  { name: "M4A4", skin: "Asiimov", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,rifle,2" },
  { name: "Desert Eagle", skin: "Blaze", rarity: 'rare', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,4" },
  { name: "AWP", skin: "Dragon Lore", rarity: 'legendary', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,1" },
  { name: "AK-47", skin: "Fire Serpent", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,2" },
  { name: "M4A4", skin: "Howl", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,3" },
];

// Sample upgrade history
const initialHistory = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    userSkin: { name: "AK-47", skin: "Elite Build", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,9" },
    targetSkin: { name: "AK-47", skin: "Vulcan", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,rifle,1" },
    chance: 15,
    success: true
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    userSkin: { name: "P250", skin: "Supernova", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,10" },
    targetSkin: { name: "Desert Eagle", skin: "Blaze", rarity: 'rare', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,4" },
    chance: 20,
    success: false
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    userSkin: { name: "Glock-18", skin: "Dragon Tattoo", rarity: 'uncommon', image: "https://source.unsplash.com/random/100x80/?csgo,weapon,11" },
    targetSkin: { name: "M4A4", skin: "Asiimov", rarity: 'epic', image: "https://source.unsplash.com/random/100x80/?csgo,rifle,2" },
    chance: 12,
    success: true
  }
];

const Upgrades = () => {
  const [selectedSkin, setSelectedSkin] = useState<WeaponSkin | null>(null);
  const [showInventory, setShowInventory] = useState(false);
  const [upgradeHistory, setUpgradeHistory] = useState(initialHistory);
  
  // Calculate chance based on rarity difference
  const calculateChance = (userSkin: WeaponSkin, targetSkin: WeaponSkin): number => {
    const rarityValues = {
      'common': 1,
      'uncommon': 2,
      'rare': 3,
      'epic': 4,
      'legendary': 5
    };
    
    const userValue = rarityValues[userSkin.rarity as keyof typeof rarityValues];
    const targetValue = rarityValues[targetSkin.rarity as keyof typeof rarityValues];
    const difference = targetValue - userValue;
    
    if (difference <= 0) return 95;
    if (difference === 1) return 45;
    if (difference === 2) return 25;
    if (difference === 3) return 10;
    return 5;
  };
  
  // Filter target skins that are better than the selected skin
  const getAvailableTargetSkins = (skin: WeaponSkin): WeaponSkin[] => {
    const rarityValues = {
      'common': 1,
      'uncommon': 2,
      'rare': 3,
      'epic': 4,
      'legendary': 5
    };
    
    const skinValue = rarityValues[skin.rarity as keyof typeof rarityValues];
    
    return targetSkinsPool.filter(targetSkin => {
      const targetValue = rarityValues[targetSkin.rarity as keyof typeof rarityValues];
      return targetValue >= skinValue;
    });
  };
  
  // Handle upgrade attempt
  const handleUpgrade = () => {
    if (!selectedSkin) return;
    
    const availableTargets = getAvailableTargetSkins(selectedSkin);
    const targetSkin = availableTargets[0]; // Use first target for simplicity
    const chance = calculateChance(selectedSkin, targetSkin);
    
    // Simulate upgrade result
    const roll = Math.random() * 100;
    const success = roll <= chance;
    
    // Add to history
    const newHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      userSkin: selectedSkin,
      targetSkin,
      chance,
      success
    };
    
    setUpgradeHistory([newHistoryItem, ...upgradeHistory]);
    
    // Show result (in a real app, you'd have a modal or animation)
    alert(success ? "Апгрейд успешен! 🎉" : "Неудача... 😔");
    
    // Reset selection if successful (simulating item being consumed)
    if (success) {
      setSelectedSkin(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero section */}
      <div className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-upgrade-hero z-0 opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
            <span className="text-primary">Апгрейд</span> Скинов CS:GO
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
            Улучшай свои скины до более ценных и редких
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex flex-col gap-8">
          {/* Skin selection section */}
          <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Package2 className="mr-2 text-primary" /> Выберите скин для апгрейда
            </h2>
            
            {selectedSkin ? (
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="bg-card p-4 rounded-lg border border-border/50 w-full md:w-64">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={selectedSkin.image} 
                      alt={selectedSkin.name} 
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">{selectedSkin.name}</h3>
                    <p className="text-gray-300">{selectedSkin.skin}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-lg mb-2">Выбран скин для апгрейда:</p>
                  <p className="text-xl font-bold text-primary mb-4">{selectedSkin.name} | {selectedSkin.skin}</p>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="border-primary/50 hover:border-primary"
                      onClick={() => setShowInventory(true)}
                    >
                      Выбрать другой скин
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => setSelectedSkin(null)}
                    >
                      Отменить выбор
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-10 border border-dashed border-border/50 rounded-lg bg-card/20">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-xl text-gray-400 mb-4">Нет выбранного скина</p>
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  onClick={() => setShowInventory(true)}
                >
                  Выбрать скин из инвентаря
                </Button>
              </div>
            )}
            
            {/* Inventory popup */}
            {showInventory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
                <div className="bg-card rounded-lg border border-border/50 w-full max-w-4xl max-h-[80vh] overflow-hidden">
                  <div className="p-4 border-b border-border/50 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Ваш инвентарь</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowInventory(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {userInventory.map((skin, index) => (
                        <div 
                          key={index}
                          className="bg-card/50 rounded-lg p-3 cursor-pointer hover:bg-primary/10 transition-colors border border-border/50"
                          onClick={() => {
                            setSelectedSkin(skin);
                            setShowInventory(false);
                          }}
                        >
                          <div className="flex justify-center mb-2">
                            <img 
                              src={skin.image} 
                              alt={skin.name} 
                              className="w-24 h-24 object-contain"
                            />
                          </div>
                          <div className="text-center">
                            <p className="font-medium truncate">{skin.name}</p>
                            <p className="text-sm text-gray-400 truncate">{skin.skin}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Upgrade card */}
          {selectedSkin && (
            <UpgradeCard 
              userSkin={selectedSkin}
              targetSkins={getAvailableTargetSkins(selectedSkin)}
              chance={calculateChance(selectedSkin, getAvailableTargetSkins(selectedSkin)[0])}
              onUpgrade={handleUpgrade}
            />
          )}
          
          {/* Upgrade history */}
          <UpgradeHistory history={upgradeHistory} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Upgrades;
