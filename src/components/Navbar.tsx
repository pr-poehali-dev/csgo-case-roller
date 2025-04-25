import { Button } from "@/components/ui/button";
import { User, Gift, Wallet, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border/50 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <span className="text-2xl font-bold text-primary glow-text">CSGO<span className="text-white">Кейсы</span></span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className={`${isActive('/') ? 'text-primary' : 'text-white'} hover:text-primary px-3 py-2 rounded-md font-medium transition-colors`}
                >
                  Главная
                </Link>
                <Link 
                  to="/cases" 
                  className={`${isActive('/cases') ? 'text-primary' : 'text-white'} hover:text-primary px-3 py-2 rounded-md font-medium transition-colors`}
                >
                  Кейсы
                </Link>
                <Link 
                  to="/upgrades" 
                  className={`${isActive('/upgrades') ? 'text-primary' : 'text-white'} hover:text-primary px-3 py-2 rounded-md font-medium transition-colors`}
                >
                  Апгрейды
                </Link>
                <Link 
                  to="/updates" 
                  className={`${isActive('/updates') ? 'text-primary' : 'text-white'} hover:text-primary px-3 py-2 rounded-md font-medium transition-colors`}
                >
                  Обновления
                </Link>
                <Link 
                  to="/faq" 
                  className={`${isActive('/faq') ? 'text-primary' : 'text-white'} hover:text-primary px-3 py-2 rounded-md font-medium transition-colors`}
                >
                  F.A.Q
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-primary/50 hover:border-primary bg-card/50">
                <Wallet className="h-4 w-4 mr-2" />
                <span>1000 ₽</span>
              </Button>
              <Button variant="ghost" className="hover:bg-card/50">
                <Gift className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="hover:bg-card/50">
                <User className="h-4 w-4" />
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Войти
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-primary' : 'text-white'} hover:text-primary block px-3 py-2 rounded-md font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/cases" 
              className={`${isActive('/cases') ? 'text-primary' : 'text-white'} hover:text-primary block px-3 py-2 rounded-md font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Кейсы
            </Link>
            <Link 
              to="/upgrades" 
              className={`${isActive('/upgrades') ? 'text-primary' : 'text-white'} hover:text-primary block px-3 py-2 rounded-md font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Апгрейды
            </Link>
            <Link 
              to="/updates" 
              className={`${isActive('/updates') ? 'text-primary' : 'text-white'} hover:text-primary block px-3 py-2 rounded-md font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Обновления
            </Link>
            <Link 
              to="/faq" 
              className={`${isActive('/faq') ? 'text-primary' : 'text-white'} hover:text-primary block px-3 py-2 rounded-md font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              F.A.Q
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" className="border-primary/50 w-full justify-start">
                <Wallet className="h-4 w-4 mr-2" />
                <span>1000 ₽</span>
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary w-full">
                Войти
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
