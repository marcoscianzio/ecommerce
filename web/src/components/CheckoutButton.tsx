import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCreateCheckoutSessionMutation } from "../generated/graphql";

interface CheckoutButtonProps {
  total: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ total }) => {
  const [checkout, { loading }] = useCreateCheckoutSessionMutation();
  const router = useRouter();

  return (
    <Button
      loadingText="loading..."
      isLoading={loading}
      variant="primary"
      onClick={async () => {
        return await checkout({
          update: (_, { data }) => {
            if (data) {
              router.push(data.createCheckoutSession);
            }
          },
        });
      }}
    >
      checkout ${total}
    </Button>
  );
};

export default CheckoutButton;
