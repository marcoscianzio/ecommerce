import { Button, Container, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import MotionHeading from "../components/motion/MotionHeading";
import { useRegisterMutation, MeDocument, MeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Layout>
      <Container pt={12} maxW="container.xl" alignSelf="center">
        <Stack spacing={12}>
          <MotionHeading fontSize="10xl" textAlign="center">
            register now
          </MotionHeading>
          <Container alignSelf="center" maxW="container.md">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await register({
                  variables: {
                    values,
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.register.user,
                      },
                    });
                  },
                });

                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors));
                } else {
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting, dirty }) => (
                <Stack spacing={4} as={Form}>
                  <InputField name="email" />
                  <InputField type="password" name="password" />
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!dirty}
                    isLoading={isSubmitting}
                    loadingText="registering"
                  >
                    register
                  </Button>
                </Stack>
              )}
            </Formik>
          </Container>
        </Stack>
      </Container>
    </Layout>
  );
};

export default withApollo()(Register);
