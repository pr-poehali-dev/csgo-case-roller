import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SkinCard from "@/components/SkinCard";
import { Case } from "@/components/CaseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import LiveDrops from "@/components/LiveDrops";
import { ChevronLeft, ChevronRight, Info, ArrowRight } from "lucide-react";

// Import mock data
import { casesData } from "@/lib/mockData";

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [caseDetails, setCaseDetails] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
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
    }
    
    setLoading(false);
  }, [caseId]);

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

  const handleOpenCase = () => {
    if (caseDetails) {
      navigate(`/case/${caseId}/open`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!caseDetails) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold mb-4">Кейс не найден</h1>
          <p className="mb-6">Запрошенный вами кейс не существует.</p>
          <Link to="/" className="btn bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg font-medium">
            Вернуться на главную
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Sort items by rarity (legendary first)
  const sortedItems = [...caseDetails.items].sort((a, b) => {
    const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
    return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - 
           (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-primary transition-colors">
            <ChevronLeft size={16} />
            <span>Назад к кейсам</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-8 mb-8 bg-card rounded-2xl p-6">
              <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-xl"></div>
                  <img 
                    src={caseDetails.image} 
                    alt={caseDetails.name} 
                    className="w-full h-full object-contain animate-float z-10"
                  />
                </div>
              </div>
              
              <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-2">{caseDetails.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-card/50 border border-border/30 rounded-full px-3 py-1 text-sm">
                    {caseDetails.items.length} предметов
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 bg-card/50 border border-border/30 rounded-full px-3 py-1 text-sm">
                    <span className="text-sm">⭐</span>
                    <span>4.8/5</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Описание</h3>
                  <p className="text-gray-400 mb-4">
                    {caseDetails.name} содержит эксклюзивную коллекцию скинов CS:GO. 
                    Открывайте кейс и получайте крутые предметы прямо сейчас!
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {['common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => {
                      const count = caseDetails.items.filter(item => item.rarity === rarity).length;
                      if (count === 0) return null;
                      
                      const colors = {
                        common: 'bg-gray-400',
                        uncommon: 'bg-blue-500',
                        rare: 'bg-purple-500',
                        epic: 'bg-pink-500',
                        legendary: 'bg-yellow-400'
                      };
                      
                      return (
                        <div key={rarity} className="flex items-center gap-1.5">
                          <div className={`w-3 h-3 rounded-full ${colors[rarity as keyof typeof colors]}`}></div>
                          <span className="text-sm capitalize">{rarity}: {count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-card/50 border border-border/30 rounded-xl p-4 flex-1 min-w-[120px]">
                    <p className="text-gray-400 text-sm mb-1">Цена</p>
                    <p className="font-bold text-xl">{caseDetails.price} ₽</p>
                  </div>
                  
                  <div className="bg-card/50 border border-border/30 rounded-xl p-4 flex-1 min-w-[120px]">
                    <p className="text-gray-400 text-sm mb-1">Открыто раз</p>
                    <p className="font-bold text-xl">{Math.floor(Math.random() * 10000) + 1000}</p>
                  </div>
                  
                  <div className="bg-card/50 border border-border/30 rounded-xl p-4 flex-1 min-w-[120px]">
                    <p className="text-gray-400 text-sm mb-1">Шанс окупа</p>
                    <p className="font-bold text-xl">{Math.floor(Math.random() * 30) + 20}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-2xl p-6 mb-8">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Все предметы ({sortedItems.length})</TabsTrigger>
                  <TabsTrigger value="legendary">Легендарные ({sortedItems.filter(item => item.rarity === 'legendary').length})</TabsTrigger>
                  <TabsTrigger value="epic">Эпические ({sortedItems.filter(item => item.rarity === 'epic').length})</TabsTrigger>
                  <TabsTrigger value="rare">Редкие ({sortedItems.filter(item => item.rarity === 'rare').length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {sortedItems.map((item, index) => (
                      <SkinCard key={index} skin={item} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="legendary" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {sortedItems.filter(item => item.rarity === 'legendary').map((item, index) => (
                      <SkinCard key={index} skin={item} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="epic" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {sortedItems.filter(item => item.rarity === 'epic').map((item, index) => (
                      <SkinCard key={index} skin={item} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="rare" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {sortedItems.filter(item => item.rarity === 'rare').map((item, index) => (
                      <SkinCard key={index} skin={item} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-card rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Правила открытия кейса</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">1</div>
                  <p>Нажмите кнопку "Открыть кейс" и оплатите открытие</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">2</div>
                  <p>Дождитесь завершения анимации открытия кейса</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">3</div>
                  <p>Получите выпавший предмет и решите - забрать его или продать</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">4</div>
                  <p>Предметы автоматически зачисляются в ваш инвентарь</p>
                </div>
              </div>
              
              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
                <Info size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Открывая кейс, вы соглашаетесь с нашими <a href="#" className="text-primary underline">правилами сервиса</a> и подтверждаете, что вам исполнилось 18 лет.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Открыть кейс</h2>
              
              <div className="mb-6">
                <div className="bg-card/50 border border-border/30 rounded-xl p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Цена кейса:</span>
                    <span className="font-medium">{caseDetails.price} ₽</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Комиссия:</span>
                    <span className="font-medium">0 ₽</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{caseDetails.price} ₽</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleOpenCase}
                  className="w-full py-6 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 mb-4"
                >
                  Открыть кейс
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                
                <div className="text-center text-sm text-gray-400">
                  На вашем балансе: <span className="text-white font-medium">10 000 ₽</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Последние дропы</h3>
                <div className="space-y-3">
                  {sortedItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-card/50 border border-border/30 rounded-lg p-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-contain"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs">{item.skin}</p>
                      </div>
                      <div className="text-sm font-bold">
                        {item.price} ₽
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <LiveDrops />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CaseDetails;
