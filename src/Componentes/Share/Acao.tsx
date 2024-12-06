import React, { useEffect, useState } from "react";
import { ShareProps } from "../../Interfaces/ShareProps";
import { getAcaoPorCodigo } from "../../Servicos/MercadoFacilAPI";
import AcaoDisplay from "../ShareDisplay/ShareDisplay";

const Acao: React.FC<ShareProps> = ({ symbol }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const toggleFavorite = (symbol: string) => {
    const updatedFavorites = favorites.includes(symbol)
      ? favorites.filter((fav) => fav !== symbol)
      : [...favorites, symbol];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const data = await Promise.race([
        getAcaoPorCodigo(symbol),
        new Promise<Error>((_, reject) => setTimeout(() => reject(new Error("Tempo limite excedido (5 segundos)")), 5000)),
      ]);

      if (!data || Object.keys(data).length === 0) {
        setError("Ação não encontrada");
      } else {
        setData(data);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
    fetchStockData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-lg text-gray-500">Loading ...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-lg text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg shadow-md">
      <AcaoDisplay
        logourl={data?.logourl}
        symbol={data?.symbol}
        shortName={data?.shortName}
        currency={data?.currency}
        regularMarketPrice={data?.regularMarketPrice}
        regularMarketDayRange={data?.regularMarketDayRange}
        regularMarketDayHigh={data?.regularMarketDayHigh}
        onToggleFavorite={toggleFavorite}
        isFavorite={favorites.includes(data.symbol)}
      />
    </div>
  );
};

export default Acao;
