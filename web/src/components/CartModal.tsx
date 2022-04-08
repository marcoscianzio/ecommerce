import { gql } from "@apollo/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiShoppingCart, FiTrash } from "react-icons/fi";
import {
  MeDocument,
  useMyCartLazyQuery,
  useRemoveItemFromCartMutation,
} from "../generated/graphql";
import AddOrRemoveButtons from "./AddOrRemoveButtons";
import CheckoutButton from "./CheckoutButton";

interface CartModalProps {}

const CartModal: React.FC<CartModalProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [myCart, { data, loading }] = useMyCartLazyQuery();
  const [removeWholeItem] = useRemoveItemFromCartMutation();

  return (
    <>
      <Icon
        onClick={async () => {
          onOpen();
          await myCart();
        }}
        cursor="pointer"
        boxSize={8}
        color="palette.400"
        as={FiShoppingCart}
      />

      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="4xl">MY CART</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              {loading ? (
                <Spinner></Spinner>
              ) : data?.myCart?.readyForCheckout ? (
                data?.myCart?.cartItems?.map((item) => (
                  <Stack key={item.itemId} direction="row" spacing={4}>
                    <Stack
                      bgSize="cover"
                      bgImage={`url(${item.item.images[0].url})`}
                      w={40}
                    />
                    <Stack spacing={4} w="full">
                      <HStack justify="space-between">
                        <Text fontFamily="Basement Grotesque Black">
                          {item.item.name}
                        </Text>
                        <Icon
                          cursor="pointer"
                          _hover={{
                            color: "red.800",
                          }}
                          onClick={async () => {
                            return await removeWholeItem({
                              variables: {
                                itemId: item.itemId,
                                whole: true,
                              },
                              update: (cache) => {
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

                                cache.writeFragment({
                                  id: "User:" + me!.me.id,
                                  fragment: gql`
                                    fragment __30 on User {
                                      activeCart {
                                        itemCount
                                      }
                                    }
                                  `,
                                  data: {
                                    activeCart: {
                                      itemCount:
                                        me!.me.activeCart.itemCount -
                                        item.quantity,
                                    },
                                  },
                                });

                                cache.evict({ id: "Cart:" + item.cartId });
                                cache.evict({
                                  id: `CartItem:{"itemId":"${item.itemId}","cartId":"${item.cartId}"}`,
                                });
                              },
                            });
                          }}
                          boxSize={5}
                          color="red.400"
                          as={FiTrash}
                        ></Icon>
                      </HStack>

                      <Text>${item.total}</Text>
                      <AddOrRemoveButtons
                        cartId={item.cartId}
                        userId={data.myCart!.userId}
                        itemId={item.itemId}
                        itemUnitAmount={item.item.unitAmount}
                        quantity={item.quantity}
                      />
                    </Stack>
                  </Stack>
                ))
              ) : null}
              {data?.myCart?.readyForCheckout ? (
                <CheckoutButton total={data.myCart.total} />
              ) : (
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    no products
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    add one in order to checkout
                  </AlertDescription>
                </Alert>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;
