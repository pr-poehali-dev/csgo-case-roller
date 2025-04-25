import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { WeaponSkin } from "./CaseCard";

interface UpgradeCardProps {
  userSkin: WeaponSkin;
  targetSkins: WeaponSkin[];
  chance: number;
  onUpgrade: () => void;
}

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-blue-400 to-blue-600',
    rare: 'from-purple-400 to-purple-600',
    epic: 'from-pink-400 to-pink-600',
    legendary: 'from-yellow-300 to-yellow-500'
  };
  return colors[rarity as keyof typeof colors] || 'from-gray-400 to-gray-500';
};

const getRarityBorder = (rarity: string) => {
  const colors = {
    common: 'border-gray-400',
    uncommon: 'border-blue-500',
    rare: 'border-purple-500',
    epic: 'border-pink-500',
    legendary: 'border-yellow-400'
  };
  return colors[rarity as keyof typeof colors] || 'border-gray-400';
};

const UpgradeCard = ({ userSkin, targetSkins, chance, onUpgrade }: UpgradeCardProps) => {
  const [selectedTarget, setSelectedTarget] = useState(targetSkins[0]);
  const [showTargets, setShowTargets] = useState(false);

  return (
    <div className="bg-card rounded-lg overflow-hidden p-5 border border-border/50">
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        {/* User skin */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className={`relative w-full max-w-[200px] h-48 p-4 flex items-center justify-center bg-gradient-to-b ${getRarityColor(userSkin.rarity)} rounded-lg`}>
            <img 
              src={userSkin.image} 
              alt={`${userSkin.name} | ${userSkin.skin}`}
              className="max-w-full max-h-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="mt-3 text-center">
            <h3 className="font-medium">{userSkin.name}</h3>
            <p className="text-gray-300">{userSkin.skin}</p>
          </div>
        </div>

        {/* Arrow and chance */}
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-card border border-primary animate-pulse">
            <ArrowRight size={30} className="text-primary" />
          </div>
          <div className="mt-3 text-center">
            <p className="text-lg font-bold">Шанс: <span className="text-primary">{chance}%</span></p>
            <p className="text-sm text-gray-400">Коэффициент: {(100 / chance).toFixed(2)}x</p>
          </div>
        </div>

        {/* Target skin selector */}
        <div className="w-full lg:w-1/3">
          <div className="relative">
            <div 
              className={`relative w-full max-w-[200px] h-48 mx-auto p-4 flex items-center justify-center bg-gradient-to-b ${getRarityColor(selectedTarget.rarity)} rounded-lg cursor-pointer`}
              onClick={() => setShowTargets(!showTargets)}
            >
              <img 
                src={selectedTarget.image} 
                alt={`${selectedTarget.name} | ${selectedTarget.skin}`}
                className="max-w-full max-h-full object-contain drop-shadow-lg"
              />
              <div className="absolute top-2 right-2 bg-black/70 rounded-full w-6 h-6 flex items-center justify-center">
                {showTargets ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </div>
            
            {/* Dropdown for target skin selection */}
            {showTargets && (
              <div className="absolute z-10 mt-2 w-full max-w-[200px] mx-auto bg-card/95 backdrop-blur-md rounded-lg border border-border/50 py-2 max-h-60 overflow-y-auto">
                {targetSkins.map((skin, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-primary/10 ${selectedTarget === skin ? 'bg-primary/20' : ''}`}
                    onClick={() => {
                      setSelectedTarget(skin);
                      setShowTargets(false);
                    }}
                  >
                    <div className={`w-8 h-8 rounded border ${getRarityBorder(skin.rarity)} overflow-hidden flex-shrink-0`}>
                      <img 
                        src={skin.image} 
                        alt={skin.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{skin.name}</p>
                      <p className="text-xs text-gray-400 truncate">{skin.skin}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <h3 className="font-medium">{selectedTarget.name}</h3>
            <p className="text-gray-300">{selectedTarget.skin}</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        <Button 
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-12 py-6 rounded-lg font-bold"
          onClick={onUpgrade}
        >
          Апгрейд
        </Button>
      </div>
    </div>
  );
};

export default UpgradeCard;
