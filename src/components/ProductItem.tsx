import { memo, useState } from "react";
import dynamic from "next/dynamic";
import loadash from "lodash";

import { AddProductToWishListProps } from "../components/AddProductToWishList";

// só irá renderizar o componente ou as funções de um lib quando aquele componente for chamado, clicado, etc
const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList);
}, {
  loading: () => <span>Carregando...</span> // mostra em tela enquanto os dados não estão carregados
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
};

function ProductItemComponent ({ product, onAddToWishList }: ProductItemProps) {
  /*
  Apenas para saber como usar a funcionalidade de dynamic import com funções de libs:

  const showFormattedDate = async () => {
    const { format } = await import('date-fns');

    format(); // formatar o dado
  };
  */

  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product?.title} - <strong>{product?.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      { isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product?.id)}
          onRequestClose={() => {setIsAddingToWishList(false)}}
        />
      ) }
    </div>
  );
};

/* o memo() evita que o react crie uma nova versão do componente caso a condição q foi passada como segundo parametro, nao seja satisfatória

  Quando utilizar o memo():
    1 - Para componentes que são puros, componentes que servem apenas para dividir o código da app, para organização
    2 - Componentes que renderizam muito, para saber se o componente renderiza demais, utilizar o ReactDevTools para auxiliar
    3 - Quando o componente renderiza novamente com as mesmas propriedades
    4 - Quando o componente tem um tamanho médio para grande
*/

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return loadash.isEqual(prevProps.product, nextProps.product); // comparando se as propriedades anteriores do componente são iguais as propriedades atuais
});
