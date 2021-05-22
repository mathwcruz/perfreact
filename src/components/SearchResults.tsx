import { ProductItem } from "./ProductItem";

interface Product {
  id: number;
  price: number;
  title: string;
}

interface SearchResultsProps {
  results: Product[];
};

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map(product => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </div>
  );
};