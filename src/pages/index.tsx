import { FormEvent, useCallback, useState } from "react";

import { SearchResults } from "../components/SearchResults";

import { Product } from "../components/SearchResults";

interface Results {
  totalPrice: number;
  data: Product[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  const handleSearch = async(e: FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    };

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    // quando lidar com formatação de dados, fazer essa formatação no local onde é extraido os dados da API, para nao ocasionar em renderizações desnecessárias
    const totalPrice = data.reduce((total: number, product: Product) => {
      return total + product?.price;
    }, 0);

    setResults({ totalPrice, data });
  };

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results?.data}
        totalPrice={results?.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  );
};