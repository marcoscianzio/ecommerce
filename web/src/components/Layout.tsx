import { Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <Container minH="100vh" maxW="100vw" px={16}>
      <Navbar></Navbar>
      {children}
    </Container>
  );
};

export default Layout;
