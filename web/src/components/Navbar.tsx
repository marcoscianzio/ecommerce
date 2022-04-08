import { useApolloClient } from "@apollo/client";
import {
  Button,
  ButtonGroup,
  Circle,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiHeart, FiTruck, FiUser } from "react-icons/fi";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import CartModal from "./CartModal";

const Navbar: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apollo = useApolloClient();
  let component: React.ReactNode;

  if (loading) {
    component = <Spinner></Spinner>;
  } else if (!data?.me) {
    component = (
      <ButtonGroup>
        <Link href="/login">
          <Button variant="primary">login</Button>
        </Link>
        <Link href="/register">
          <Button variant="secondary">register</Button>
        </Link>
      </ButtonGroup>
    );
  } else {
    component = (
      <HStack spacing={8}>
        <Link href="/orders">
          <Icon cursor="pointer" boxSize={8} color="palette.400" as={FiTruck} />
        </Link>

        <Stack position="relative">
          <CartModal />

          {data.me.activeCart.itemCount > 0 ? (
            <Circle
              right={-4}
              top={-3}
              marginTop="0 !important"
              position="absolute"
              size={6}
              fontSize="sm"
              bg="palette.400"
              color="white"
            >
              {data.me.activeCart.itemCount}
            </Circle>
          ) : null}
        </Stack>
        <Menu isLazy>
          <MenuButton p={0} m={0} h="auto" w="auto">
            <Icon display="block" boxSize={8} color="palette.400" as={FiUser} />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={async () => {
                await logout({
                  update: async (cache) => {
                    await apollo.resetStore();
                    cache.reset();
                  },
                });
              }}
            >
              logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  }
  return (
    <Stack py={10} as="header">
      <HStack justify="space-between" as="nav" w="full">
        <Link href="/">
          <Heading cursor="pointer">ecommerce-app</Heading>
        </Link>

        {component}
      </HStack>
    </Stack>
  );
};

export default Navbar;
