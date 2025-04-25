import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface WeaponSkin {
  name: string;
  skin: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image: string;
  price?: number;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
  items: WeaponSkin[];
}

interface CaseCardProps {
  caseItem: Case;
  onClick?: () => void;
}

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'bg-gray-400',
    uncommon: 'bg-blue-500',
    rare: 'bg-purple-500',
    epic: 'bg-pink-500',
    legendary: 'bg-yellow-400'
  };
  return colors[rarity as keyof typeof colors] || 'bg-gray-400';
};

const CaseCard = ({ caseItem, onClick }: CaseCardProps) => {
  return (
    <Link 
      to={`/case/${caseItem.id}`}
      className="case-card bg-card rounded-lg overflow-hidden flex flex-col hover-scale block"
      onClick={onClick}
    >
      <div className="relative p-4">
        <img 
          src={caseItem.image} 
          alt={caseItem.name} 
          className="w-full h-48 object-contain transition-transform hover:scale-105 duration-300 animate-float"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 rounded-full px-3 py-1 text-sm font-bold">
          {caseItem.price} ₽
        </div>
      </div>
      
      <div className="p-4 mt-auto">
        <h3 className="text-lg font-bold mb-2">{caseItem.name}</h3>
        
        <div className="flex gap-1 mb-4 h-1.5 overflow-hidden rounded-full bg-gray-800">
          {caseItem.items.slice(0, 8).map((item, index) => (
            <div 
              key={index} 
              className={`${getRarityColor(item.rarity)} h-full flex-1`} 
            />
          ))}
        </div>
        
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-bold">
          Открыть кейс
        </Button>
      </div>
    </Link>
  );
};

export default CaseCard;
