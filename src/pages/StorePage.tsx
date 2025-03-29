
import React from 'react';
import { Sparkles, ShoppingCart, BadgeDollarSign, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface StoreItemProps {
  title: string;
  coins: number;
  price: string;
  bonus?: string;
  popular?: boolean;
}

const StoreItem: React.FC<StoreItemProps> = ({ title, coins, price, bonus, popular }) => {
  const handlePurchase = () => {
    toast({
      title: "Função em desenvolvimento",
      description: "O sistema de compras estará disponível em breve!",
    });
  };
  
  return (
    <div className={`
      bg-white rounded-xl shadow-md p-6 border-2 
      ${popular ? 'border-fu-gold-400 relative' : 'border-gray-100'}
    `}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-fu-gold-500 text-white text-xs font-bold py-1 px-3 rounded-full">
          Mais Popular
        </div>
      )}
      
      <div className="flex items-center justify-center mb-4">
        <Sparkles size={24} className="text-fu-gold-500 mr-2" />
        <span className="text-2xl font-bold">{coins}</span>
      </div>
      
      <h3 className="text-center font-heading font-bold text-lg mb-2">{title}</h3>
      
      {bonus && (
        <div className="bg-green-50 text-green-700 text-xs text-center py-1 px-2 rounded mb-4">
          +{bonus} bônus
        </div>
      )}
      
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-fu-green-700">{price}</span>
      </div>
      
      <Button 
        className="w-full bg-fu-green-600 hover:bg-fu-green-700" 
        onClick={handlePurchase}
      >
        Comprar
      </Button>
    </div>
  );
};

const StorePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-fu-green-700 text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Loja</h1>
            <p className="text-lg">Adquira moedas e itens especiais para sua jornada.</p>
          </div>
        </section>
        
        <section className="py-8 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <Sparkles size={24} className="text-fu-gold-500 mr-2" />
                  <span className="text-xl font-bold">350</span>
                  <span className="ml-2 text-gray-600">Moedas disponíveis</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex items-center">
                    <ShoppingCart size={18} className="mr-1" />
                    Histórico
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <BadgeDollarSign size={18} className="mr-1" />
                    Resgatar Código
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6 text-center">Adquirir Moedas</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <StoreItem
                title="Pacote Básico"
                coins={100}
                price="R$ 4,99"
              />
              
              <StoreItem
                title="Pacote Padrão"
                coins={300}
                price="R$ 9,99"
                bonus="30 moedas"
              />
              
              <StoreItem
                title="Pacote Premium"
                coins={700}
                price="R$ 19,99"
                bonus="100 moedas"
                popular={true}
              />
              
              <StoreItem
                title="Pacote Ultra"
                coins={1500}
                price="R$ 39,99"
                bonus="300 moedas"
              />
            </div>
            
            <div className="mt-12 bg-fu-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-xl font-heading font-bold text-fu-blue-800 mb-3">Assinatura Mensal</h3>
                  <p className="mb-4">Torne-se um jogador premium e receba benefícios exclusivos todos os meses.</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-fu-blue-500 mr-2"></div>
                      <span>500 moedas todo mês</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-fu-blue-500 mr-2"></div>
                      <span>Itens cosméticos exclusivos</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-fu-blue-500 mr-2"></div>
                      <span>1 pacote premium semanal</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 md:pl-6 md:border-l border-fu-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-fu-blue-800 mb-2">R$ 24,90<span className="text-lg text-gray-600">/mês</span></div>
                    <p className="text-sm text-gray-600 mb-4">Cancele quando quiser</p>
                    <Button 
                      className="bg-fu-blue-600 hover:bg-fu-blue-700 flex items-center justify-center"
                      onClick={() => {
                        toast({
                          title: "Função em desenvolvimento",
                          description: "O sistema de assinatura estará disponível em breve!",
                        });
                      }}
                    >
                      <CreditCard size={18} className="mr-2" />
                      Assinar Agora
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StorePage;
