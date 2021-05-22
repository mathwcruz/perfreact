import { List, ListRowRenderer, AutoSizer } from "react-virtualized"; // virtualização

import { ProductItem } from "./ProductItem";

export interface Product {
  id: number;
  price: number;
  title: string;
};

interface SearchResultsProps {
  results: Product[];
  onAddToWishList: (id: number) => void;
  totalPrice: number;
};

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
        product={results[index]}
        onAddToWishList={onAddToWishList} 
      />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5} // quantos itens a aplicação deixara pré-carregada, tanto para cima, quanto apra baixo, para performance
        rowCount={results?.length} // quantos itens há na lista
        rowRenderer={rowRender} // função para renderizar a lista
      />
    </div>
  );
};

/* 
  useMemo() serve para evitar que algo que ocupa mto processamento no componente, seja refeito toda vez que esse componente renderizar
  Situações apra usar o useMemo():

    1 - Cálculos pesados, que demandam processamento
    2 - Igualdade referencial (quando a gente repassa aquela informação para um componente filho)
*/