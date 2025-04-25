import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6">
        <h1 className="text-6xl font-bold mb-2 text-primary glow-text">404</h1>
        <h2 className="text-2xl font-bold mb-6">Страница не найдена</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          Возможно, эта страница была удалена или кейс с ней был открыт кем-то другим.
        </p>
      </div>
      
      <Link to="/">
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-6">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
