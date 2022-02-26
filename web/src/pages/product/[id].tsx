import {
  Divider,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
//@ts-ignore
import ReactSlidy from "react-slidy";
import AddToCartButton from "../../components/AddToCartButton";
import Layout from "../../components/Layout";
import ToggleFavoriteButton from "../../components/ToggleFavoriteButton";
import { useItemQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface ProductProps {}

const Product: React.FC<ProductProps> = ({}) => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = useItemQuery({
    variables: {
      itemId: id as string,
    },
    skip: typeof id == "undefined",
  });

  const [actualSlide, setActualSlide] = useState<Number>(0);

  const updateSlide = ({ currentSlide }: any) => {
    setActualSlide(currentSlide);
  };

  if (loading || !data?.item) {
    return (
      <Layout>
        <Spinner></Spinner>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack direction="row">
        <Stack w="60%" h="calc(100vh - 3rem - 5rem)">
          <ReactSlidy doAfterSlide={updateSlide} slide={actualSlide}>
            {data.item.images.map(({ id, url }) => (
              <Image objectFit="cover" w="60%" key={id} src={url} />
            ))}
          </ReactSlidy>
          <HStack spacing={4}>
            {data.item.images.map(({ id, url }, i) => {
              const isActualSlide = i === actualSlide;

              return (
                <Image
                  key={id}
                  cursor="pointer"
                  outline={isActualSlide ? "1px solid" : undefined}
                  outlineOffset={isActualSlide ? 2 : undefined}
                  outlineColor={isActualSlide ? "palette.400" : undefined}
                  onClick={() => {
                    setActualSlide(i);
                  }}
                  src={url}
                  objectFit="cover"
                  boxSize={"24"}
                />
              );
            })}
            <Text fontFamily="Basement Grotesque Black">
              ({data.item.images.length})
            </Text>
          </HStack>
        </Stack>
        <Stack px={4} w="40%">
          <Stack spacing={6}>
            <HStack justify="space-between">
              <Heading wordBreak="break-all" fontSize="6xl">
                {data?.item?.name}
              </Heading>
              <ToggleFavoriteButton
                itemId={data.item.id}
                liked={data.item.liked}
              />
            </HStack>

            <Divider></Divider>
            <Heading fontSize="2xl">
              ${data?.item?.unitAmount} - unit price
            </Heading>
            <Stack direction="row">
              <Tag
                variant={data.item.available ? "available" : "not_available"}
              >
                {data.item.available ? "available" : "not available"}
              </Tag>
            </Stack>

            <Text>{data.item.description}</Text>
            <AddToCartButton
              disabled={!data.item.available}
              itemId={data.item.id}
            />
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default withApollo()(Product);
