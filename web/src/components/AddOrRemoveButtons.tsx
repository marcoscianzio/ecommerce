import { ApolloCache, gql } from "@apollo/client";
import { Button, HStack, Text } from "@chakra-ui/react";
import {
  AddItemToCartMutation,
  RemoveItemFromCartMutation,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
} from "../generated/graphql";

interface AddOrRemoveButtonsProps {
  quantity: number;
  itemId: string;
  itemUnitAmount: number;
  cartId: string;
  userId: string;
}

const updateAfterAction = (
  itemId: string,
  itemUnitAmount: number,
  cache: ApolloCache<AddItemToCartMutation | RemoveItemFromCartMutation>,
  type: "add" | "remove",
  cartId: string,
  userId: string
) => {
  const data = cache.readFragment<{
    quantity: number;
    total: number;
  }>({
    id: `CartItem:{"itemId":"${itemId}","cartId":"${cartId}"}`,
    fragment: gql`
      fragment __1 on CartItem {
        quantity
        total
      }
    `,
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

  const cart = cache.readFragment<{
    itemCount: number;
    total: number;
  }>({
    id: `Cart:${cartId}`,
    fragment: gql`
      fragment __2 on Cart {
        itemCount
        total
      }
    `,
  });

  if (data && cart && item) {
    const isAdd = type === "add";

    const newItemCount = isAdd ? cart.itemCount + 1 : cart.itemCount - 1;

    cache.writeFragment({
      id: `User:${userId}`,
      fragment: gql`
        fragment __5 on User {
          activeCart {
            itemCount
          }
        }
      `,
      data: {
        activeCart: {
          itemCount: newItemCount,
        },
      },
    });

    if (data.quantity === 1 && type === "remove") {
      cache.evict({
        id: `CartItem:{"itemId":"${itemId}","cartId":"${cartId}"}`,
      });
      cache.evict({ id: `Cart:${cartId}` });
      return;
    }

    const newStock = isAdd ? item.stock - 1 : item.stock + 1;
    const newAvailable = newStock !== 0;

    const newQuantity = isAdd ? data.quantity + 1 : data.quantity - 1;
    const newTotal = isAdd
      ? data.total + itemUnitAmount
      : data.total - itemUnitAmount;

    const newCartTotal = isAdd
      ? cart.total + itemUnitAmount
      : cart.total - itemUnitAmount;

    cache.writeFragment({
      id: `CartItem:{"itemId":"${itemId}","cartId":"${cartId}"}`,
      fragment: gql`
        fragment __3 on CartItem {
          quantity
          total
        }
      `,
      data: {
        quantity: newQuantity,
        total: newTotal,
      },
    });

    cache.writeFragment({
      id: `Cart:${cartId}`,
      fragment: gql`
        fragment __4 on Cart {
          itemCount
          total
        }
      `,
      data: {
        itemCount: newItemCount,
        total: newCartTotal,
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

    return;
  }
};

const AddOrRemoveButtons: React.FC<AddOrRemoveButtonsProps> = ({
  quantity,
  itemId,
  itemUnitAmount,
  cartId,
  userId,
}) => {
  const [addItem, { loading: loadingAdd }] = useAddItemToCartMutation();
  const [removeItem, { loading: loadingRemove }] =
    useRemoveItemFromCartMutation();

  return (
    <HStack spacing={4}>
      <Button
        variant="secondary"
        isLoading={loadingAdd}
        onClick={async () => {
          return await addItem({
            variables: {
              itemId,
            },
            update: (cache) => {
              updateAfterAction(
                itemId,
                itemUnitAmount,
                cache,
                "add",
                cartId,
                userId
              );
            },
          });
        }}
      >
        +
      </Button>
      <Text>{quantity}</Text>
      <Button
        variant="secondary"
        isLoading={loadingRemove}
        onClick={async () => {
          return await removeItem({
            variables: {
              itemId,
            },
            update: (cache) => {
              updateAfterAction(
                itemId,
                itemUnitAmount,
                cache,
                "remove",
                cartId,
                userId
              );
            },
          });
        }}
      >
        -
      </Button>
    </HStack>
  );
};

export default AddOrRemoveButtons;
