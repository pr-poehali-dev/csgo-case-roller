import { WeaponSkin } from "./CaseCard";

interface SkinCardProps {
  skin: WeaponSkin;
  size?: 'sm' | 'md' | 'lg';
  showPrice?: boolean;
  showRarity?: boolean;
  onClick?: () => void;
}

export const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-blue-500 to-blue-600',
    rare: 'from-purple-500 to-purple-600',
    epic: 'from-pink-500 to-pink-600',
    legendary: 'from-yellow-400 to-amber-500'
  };
  return colors[rarity as keyof typeof colors] || 'from-gray-400 to-gray-500';
};

export const getRarityBorderColor = (rarity: string) => {
  const colors = {
    common: 'border-gray-400',
    uncommon: 'border-blue-500',
    rare: 'border-purple-500',
    epic: 'border-pink-500',
    legendary: 'border-yellow-400'
  };
  return colors[rarity as keyof typeof colors] || 'border-gray-400';
};

export const SkinCard = ({ 
  skin, 
  size = 'md', 
  showPrice = true, 
  showRarity = true,
  onClick 
}: SkinCardProps) => {
  const sizeClasses = {
    sm: "w-32 h-40",
    md: "w-48 h-60",
    lg: "w-64 h-80"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div
      onClick={onClick}
      className={`skin-card ${sizeClasses[size]} rounded-lg overflow-hidden relative cursor-pointer transition-all hover-scale group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${getRarityColor(skin.rarity)} opacity-20 z-0`}></div>
      <div className={`absolute inset-0 border-2 ${getRarityBorderColor(skin.rarity)} rounded-lg z-10`}></div>
      
      <div className="flex flex-col h-full relative z-20 p-3">
        <div className="flex-grow flex items-center justify-center mb-2">
          <img 
            src={skin.image} 
            alt={`${skin.name} | ${skin.skin}`} 
            className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 duration-300"
          />
        </div>
        
        <div className="text-center">
          <p className={`font-medium truncate ${textSizes[size]}`}>{skin.name}</p>
          <p className={`font-bold truncate ${textSizes[size]}`}>{skin.skin}</p>
          
          {showRarity && (
            <p className={`text-xs opacity-70 capitalize ${textSizes[size] === 'text-xs' ? 'text-[10px]' : ''}`}>
              {skin.rarity}
            </p>
          )}
          
          {showPrice && skin.price && (
            <p className={`font-bold mt-1 text-primary ${textSizes[size]}`}>
              {skin.price} ₽
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinCard;
