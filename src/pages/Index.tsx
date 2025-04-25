import { useState } from "react";
import Navbar from "@/components/Navbar";
import CaseGrid from "@/components/CaseGrid";
import Footer from "@/components/Footer";
import LiveDrops from "@/components/LiveDrops";
import { Button } from "@/components/ui/button";
import { Case } from "@/components/CaseCard";
import { Search, Filter, ChevronDown } from "lucide-react";

const casesData: Case[] = [
  {
    id: "premium",
    name: "Премиум Кейс",
    price: 1999,
    image: "https://source.unsplash.com/random/240x240/?csgo,case,1",
    items: [
      { name: "AWP", skin: "Dragon Lore", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,1" },
      { name: "AK-47", skin: "Fire Serpent", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,2" },
      { name: "M4A4", skin: "Howl", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,3" },
      { name: "Desert Eagle", skin: "Blaze", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,4" },
      { name: "Glock-18", skin: "Fade", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,5" },
      { name: "USP-S", skin: "Kill Confirmed", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,6" },
      { name: "P250", skin: "Mehndi", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,7" },
      { name: "P90", skin: "Asiimov", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,8" }
    ]
  },
  {
    id: "knife",
    name: "Кейс с Ножами",
    price: 2999,
    image: "https://source.unsplash.com/random/240x240/?csgo,knife,1",
    items: [
      { name: "Karambit", skin: "Fade", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,knife,1" },
      { name: "M9 Bayonet", skin: "Crimson Web", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,knife,2" },
      { name: "Butterfly Knife", skin: "Doppler", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,knife,3" },
      { name: "Flip Knife", skin: "Marble Fade", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,knife,4" },
      { name: "Gut Knife", skin: "Tiger Tooth", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,knife,5" },
      { name: "Falchion Knife", skin: "Slaughter", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,knife,6" },
      { name: "Shadow Daggers", skin: "Blue Steel", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,knife,7" },
      { name: "Huntsman Knife", skin: "Case Hardened", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,knife,8" }
    ]
  },
  {
    id: "sniper",
    name: "Кейс Снайпера",
    price: 1499,
    image: "https://source.unsplash.com/random/240x240/?csgo,sniper,1",
    items: [
      { name: "AWP", skin: "Medusa", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,1" },
      { name: "AWP", skin: "Asiimov", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,2" },
      { name: "SSG 08", skin: "Blood in the Water", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,3" },
      { name: "AWP", skin: "Hyper Beast", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,4" },
      { name: "G3SG1", skin: "The Executioner", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,5" },
      { name: "SCAR-20", skin: "Bloodsport", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,6" },
      { name: "AWP", skin: "Electric Hive", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,7" },
      { name: "SSG 08", skin: "Dragonfire", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,8" }
    ]
  },
  {
    id: "pistol",
    name: "Кейс Пистолетов",
    price: 599,
    image: "https://source.unsplash.com/random/240x240/?csgo,pistol,1",
    items: [
      { name: "Desert Eagle", skin: "Golden Koi", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,1" },
      { name: "Five-Seven", skin: "Case Hardened", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,2" },
      { name: "Glock-18", skin: "Water Elemental", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,3" },
      { name: "USP-S", skin: "Neo-Noir", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,4" },
      { name: "P2000", skin: "Ocean Foam", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,5" },
      { name: "Tec-9", skin: "Nuclear Threat", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,6" },
      { name: "CZ75-Auto", skin: "The Fuschia Is Now", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,7" },
      { name: "P250", skin: "Asiimov", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,8" }
    ]
  },
  {
    id: "rifle",
    name: "Кейс Винтовок",
    price: 899,
    image: "https://source.unsplash.com/random/240x240/?csgo,rifle,1",
    items: [
      { name: "AK-47", skin: "Vulcan", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,1" },
      { name: "M4A4", skin: "Asiimov", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,2" },
      { name: "AUG", skin: "Akihabara Accept", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,3" },
      { name: "FAMAS", skin: "Afterimage", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,4" },
      { name: "M4A1-S", skin: "Hyper Beast", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,5" },
      { name: "Galil AR", skin: "Eco", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,6" },
      { name: "SG 553", skin: "Cyrex", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,7" },
      { name: "AK-47", skin: "Redline", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,8" }
    ]
  },
  {
    id: "starter",
    name: "Стартовый Кейс",
    price: 249,
    image: "https://source.unsplash.com/random/240x240/?csgo,case,2",
    items: [
      { name: "AK-47", skin: "Elite Build", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,9" },
      { name: "P250", skin: "Supernova", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,10" },
      { name: "Glock-18", skin: "Dragon Tattoo", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,11" },
      { name: "M4A4", skin: "Evil Daimyo", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,12" },
      { name: "MP7", skin: "Skulls", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,13" },
      { name: "P90", skin: "Teardown", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,14" },
      { name: "G3SG1", skin: "Contractor", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,15" },
      { name: "MAC-10", skin: "Candy Apple", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,16" }
    ]
  },
  {
    id: "gloves",
    name: "Кейс Перчаток",
    price: 4999,
    image: "https://source.unsplash.com/random/240x240/?csgo,gloves",
    items: [
      { name: "Specialist Gloves", skin: "Crimson Kimono", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,1" },
      { name: "Sport Gloves", skin: "Pandora's Box", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,2" },
      { name: "Driver Gloves", skin: "Lunar Weave", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,3" },
      { name: "Hand Wraps", skin: "Slaughter", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,4" },
      { name: "Bloodhound Gloves", skin: "Guerrilla", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,5" },
      { name: "Moto Gloves", skin: "Boom!", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,6" },
      { name: "Hydra Gloves", skin: "Case Hardened", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,7" },
      { name: "Sport Gloves", skin: "Arid", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,8" }
    ]
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCaseClick = (caseId: string) => {
    console.log("Opening case:", caseId);
    // Here you would implement case opening functionality
  };

  const filteredCases = casesData.filter((caseItem) => {
    // Filter by search term
    if (searchTerm && !caseItem.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      // This is a simple implementation, you'd want to add proper category tags to cases
      if (selectedCategory === "premium" && caseItem.price < 1500) return false;
      if (selectedCategory === "standard" && (caseItem.price >= 1500 || caseItem.price < 500)) return false;
      if (selectedCategory === "budget" && caseItem.price >= 500) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero section */}
      <div className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-csgo z-0 opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
            Открывай <span className="text-primary">Кейсы CS:GO</span> Прямо Сейчас!
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            Лучшие шансы на редкие скины и моментальный вывод
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6">
              Начать Открывать
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6 border-primary/50 hover:border-primary bg-card/50">
              Популярные Кейсы
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cases column */}
          <div className="w-full md:w-3/4">
            {/* Search and filters */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Поиск кейсов..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="border-border/50 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Filter size={16} /> 
                  Фильтры
                  <ChevronDown size={14} />
                </Button>
                <div className="relative">
                  <select
                    className="appearance-none w-full pl-4 pr-8 py-2 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Все цены</option>
                    <option value="premium">Премиум</option>
                    <option value="standard">Стандарт</option>
                    <option value="budget">Бюджет</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
              </div>
            </div>
            
            {/* Cases grid */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Популярные кейсы</h2>
              <CaseGrid cases={filteredCases} onCaseClick={handleCaseClick} />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <LiveDrops />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
