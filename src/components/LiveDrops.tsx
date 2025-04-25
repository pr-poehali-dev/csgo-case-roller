import { useEffect, useState } from "react";
import { WeaponSkin } from "./CaseCard";

interface LiveDrop {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  item: WeaponSkin;
  timestamp: Date;
}

const getRarityClass = (rarity: string) => {
  const classes = {
    common: 'border-gray-400 bg-gray-400/10',
    uncommon: 'border-blue-500 bg-blue-500/10',
    rare: 'border-purple-500 bg-purple-500/10',
    epic: 'border-pink-500 bg-pink-500/10',
    legendary: 'border-yellow-400 bg-yellow-400/10 glow'
  };
  return classes[rarity as keyof typeof classes] || 'border-gray-400 bg-gray-400/10';
};

const getRandomName = () => {
  const names = ['User', 'Player', 'Gamer', 'Pro', 'Sniper', 'Hunter', 'Wolf', 'Eagle', 'Shark'];
  const numbers = Math.floor(Math.random() * 10000);
  return `${names[Math.floor(Math.random() * names.length)]}${numbers}`;
};

const mockDrops: LiveDrop[] = [
  {
    id: '1',
    user: {
      name: getRandomName(),
      avatar: 'https://source.unsplash.com/random/32x32/?person,1'
    },
    item: {
      name: 'AWP',
      skin: 'Dragon Lore',
      rarity: 'legendary',
      image: 'https://source.unsplash.com/random/100x80/?csgo,weapon,1'
    },
    timestamp: new Date()
  },
  {
    id: '2',
    user: {
      name: getRandomName(),
      avatar: 'https://source.unsplash.com/random/32x32/?person,2'
    },
    item: {
      name: 'AK-47',
      skin: 'Vulcan',
      rarity: 'epic',
      image: 'https://source.unsplash.com/random/100x80/?csgo,weapon,2'
    },
    timestamp: new Date()
  },
  {
    id: '3',
    user: {
      name: getRandomName(),
      avatar: 'https://source.unsplash.com/random/32x32/?person,3'
    },
    item: {
      name: 'M4A4',
      skin: 'Howl',
      rarity: 'epic',
      image: 'https://source.unsplash.com/random/100x80/?csgo,weapon,3'
    },
    timestamp: new Date()
  }
];

const LiveDrops = () => {
  const [drops, setDrops] = useState<LiveDrop[]>(mockDrops);

  useEffect(() => {
    const randomRarity = (): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' => {
      const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
      const weights = [45, 30, 15, 8, 2]; // Probability weights
      
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let random = Math.floor(Math.random() * totalWeight);
      
      for (let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
          return rarities[i] as 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
        }
        random -= weights[i];
      }
      
      return 'common';
    };

    const generateRandomDrop = () => {
      const weapons = ['AK-47', 'M4A4', 'AWP', 'Desert Eagle', 'USP-S', 'Glock-18', 'Knife'];
      const skins = ['Fade', 'Crimson Web', 'Doppler', 'Lore', 'Neon Rider', 'Asiimov', 'Hyper Beast'];
      
      const rarity = randomRarity();
      const weaponIndex = Math.floor(Math.random() * weapons.length);
      const skinIndex = Math.floor(Math.random() * skins.length);
      
      const newDrop: LiveDrop = {
        id: Date.now().toString(),
        user: {
          name: getRandomName(),
          avatar: `https://source.unsplash.com/random/32x32/?person,${Math.floor(Math.random() * 20)}`
        },
        item: {
          name: weapons[weaponIndex],
          skin: skins[skinIndex],
          rarity: rarity,
          image: `https://source.unsplash.com/random/100x80/?csgo,weapon,${Math.floor(Math.random() * 20)}`
        },
        timestamp: new Date()
      };
      
      setDrops(prev => [newDrop, ...prev.slice(0, 9)]); // Keep only 10 most recent drops
    };

    const interval = setInterval(generateRandomDrop, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="animate-pulse relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        Живые дропы
      </h2>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {drops.map((drop) => (
          <div 
            key={drop.id} 
            className={`flex items-center p-2 rounded-lg border ${getRarityClass(drop.item.rarity)} transition-all duration-300`}
          >
            <img 
              src={drop.user.avatar} 
              alt={drop.user.name}
              className="w-8 h-8 rounded-full mr-3" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{drop.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(drop.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
            <div className="flex items-center">
              <img 
                src={drop.item.image} 
                alt={`${drop.item.name} | ${drop.item.skin}`}
                className="w-12 h-10 object-contain mr-2" 
              />
              <div className="text-right">
                <p className="text-sm font-medium truncate">
                  {drop.item.name}
                </p>
                <p className="text-xs font-bold" style={{ 
                  color: drop.item.rarity === 'legendary' ? '#FFD700' : 
                        drop.item.rarity === 'epic' ? '#FF44CC' :
                        drop.item.rarity === 'rare' ? '#A020F0' :
                        drop.item.rarity === 'uncommon' ? '#4169E1' : '#A9A9A9'
                }}>
                  {drop.item.skin}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveDrops;
