import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary glow-text">CSGO<span className="text-white">Кейсы</span></h3>
            <p className="text-gray-400 mb-4">
              Лучший сайт для открытия кейсов CS:GO. Гарантированные скины и моментальный вывод.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">О нас</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Условия использования</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Контакты</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Помощь</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Поддержка 24/7</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Популярные кейсы</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Премиум кейс</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Кейс VIP</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Кейс Sniper</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Кейс Knife</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            © 2023 CSGOКейсы. Все права защищены. Этот сайт не связан с Valve Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
