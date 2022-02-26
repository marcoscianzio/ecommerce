import { ApolloCache, gql } from "@apollo/client";
import { Icon, IconProps } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import {
  ToggleFavoriteMutation,
  useToggleFavoriteMutation,
} from "../generated/graphql";

type ToggleFavoriteButtonProps = IconProps & {
  itemId: string;
  liked: boolean;
};

const updateAfterAction = (
  itemId: string,
  cache: ApolloCache<ToggleFavoriteMutation>
) => {
  cache.updateFragment(
    {
      id: "Item:" + itemId,
      fragment: gql`
        fragment __50 on Item {
          liked
        }
      `,
    },
    (data) => ({ liked: !data.liked }) // update function
  );
};

const ToggleFavoriteButton: React.FC<ToggleFavoriteButtonProps> = ({
  color = "palette.400",
  liked,
  itemId,
  ...props
}) => {
  const [toggleFavorite] = useToggleFavoriteMutation();

  return (
    <Icon
      {...props}
      cursor="pointer"
      boxSize={8}
      fill={liked ? "red.400" : undefined}
      color={liked ? "red.400" : color}
      as={FiHeart}
      onClick={async (e) => {
        e.stopPropagation();
        return await toggleFavorite({
          variables: {
            toggleFavoriteItemId: itemId,
          },
          update: (cache) => {
            updateAfterAction(itemId, cache);
          },
        });
      }}
    />
  );
};

export default ToggleFavoriteButton;
