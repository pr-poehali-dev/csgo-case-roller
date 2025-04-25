import { WeaponSkin } from "./CaseCard";

interface UpgradeHistoryItem {
  id: string;
  timestamp: Date;
  userSkin: WeaponSkin;
  targetSkin: WeaponSkin;
  chance: number;
  success: boolean;
}

interface UpgradeHistoryProps {
  history: UpgradeHistoryItem[];
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

const UpgradeHistory = ({ history }: UpgradeHistoryProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-lg font-bold">История апгрейдов</h3>
      </div>
      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
        {history.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>Нет истории апгрейдов</p>
          </div>
        ) : (
          <ul className="divide-y divide-border/50">
            {history.map((item) => (
              <li key={item.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <div className={`w-1 h-8 rounded-full ${getRarityColor(item.userSkin.rarity)}`}></div>
                    <div className="w-8 h-8 bg-card/70 rounded overflow-hidden">
                      <img 
                        src={item.userSkin.image} 
                        alt={item.userSkin.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.userSkin.name}</p>
                      <p className="text-xs text-gray-400 truncate">{item.userSkin.skin}</p>
                    </div>
                  </div>
                  
                  <div className="font-mono text-xs px-2 py-1 rounded bg-card">
                    {item.chance}%
                  </div>
                  
                  <div className="flex-1 flex items-center gap-2">
                    <div className={`w-1 h-8 rounded-full ${getRarityColor(item.targetSkin.rarity)}`}></div>
                    <div className="w-8 h-8 bg-card/70 rounded overflow-hidden">
                      <img 
                        src={item.targetSkin.image} 
                        alt={item.targetSkin.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.targetSkin.name}</p>
                      <p className="text-xs text-gray-400 truncate">{item.targetSkin.skin}</p>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium ${item.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.success ? 'Успешно' : 'Неудача'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UpgradeHistory;
