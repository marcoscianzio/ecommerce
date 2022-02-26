import { Box, Button, Divider, Stack } from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../components/Layout";
import MotionHeading from "../components/motion/MotionHeading";
import MotionText from "../components/motion/MotionText";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Layout>
      <Box position="relative">
        <Stack h="calc(100vh - 2rem - 5rem)" spacing={2} direction="row">
          <Divider orientation="vertical" />
          <Stack>
            <MotionHeading fontSize="10xl">buy it</MotionHeading>
            <MotionHeading variant="outline" fontSize="10xl">
              you want it
            </MotionHeading>
            <MotionText pt={8} pb={8} fontSize="2xl" w="60%">
              Stop your search. You've certainly discovered what you were
              searching for. We offer the best quality products.
            </MotionText>
            <Link href="/products">
              <Button variant="primary" size="lg" w="40%">
                See products
              </Button>
            </Link>
          </Stack>
          <Stack
            position="absolute"
            right={-16}
            zIndex="-10"
            w="40%"
            filter="auto"
            h="full"
            backgroundPosition={"center"}
            backgroundSize="cover"
            backgroundImage="url(/xbox2.jpg)"
          />
        </Stack>
        <Divider
          w="65%"
          orientation="horizontal"
          left={-12}
          bottom={24}
          position="absolute"
        />
      </Box>
    </Layout>
  );
};
export default withApollo()(Index);
