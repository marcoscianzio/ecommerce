import { ApolloCache, gql } from "@apollo/client";
import { Button, ButtonProps } from "@chakra-ui/react";
import {
  AddItemToCartMutation,
  MeDocument,
  useAddItemToCartMutation,
} from "../generated/graphql";

type AddToCartButtonProps = ButtonProps & {
  itemId: string;
};

const updateAfterAction = (
  itemId: string,
  cache: ApolloCache<AddItemToCartMutation>
) => {
  const me = cache.readQuery<{
    me: {
      id: string;
      activeCart: {
        itemCount: number;
      };
    };
  }>({
    query: MeDocument,
  });

  const item = cache.readFragment<{ stock: number; available: boolean }>({
    id: "Item:" + itemId,
    fragment: gql`
      fragment __10 on Item {
        stock
        available
      }
    `,
  });

  if (me && item) {
    const newStock = item.stock - 1;
    const newAvailable = newStock !== 0;

    console.log({ stock: item.stock, newStock });
    const newItemCount = me.me.activeCart.itemCount + 1;

    cache.writeFragment({
      id: "User:" + me.me.id,
      fragment: gql`
        fragment __11 on User {
          activeCart {
            itemCount
          }
        }
      `,
      data: {
        activeCart: { itemCount: newItemCount },
      },
    });

    cache.writeFragment({
      id: "Item:" + itemId,
      fragment: gql`
        fragment __12 on Item {
          stock
          available
        }
      `,
      data: {
        stock: newStock,
        available: newAvailable,
      },
    });
  }
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  itemId,
  ...props
}) => {
  const [addItemToCart, { loading }] = useAddItemToCartMutation();

  return (
    <Button
      {...props}
      variant="primary"
      onClick={async () => {
        return await addItemToCart({
          variables: {
            itemId,
          },
          update: (cache) => {
            updateAfterAction(itemId, cache);
          },
        });
      }}
      isLoading={loading}
      loadingText="adding to cart..."
    >
      add to cart
    </Button>
  );
};

export default AddToCartButton;
