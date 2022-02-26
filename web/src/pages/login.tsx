import { Button, Container, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import MotionHeading from "../components/motion/MotionHeading";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Layout>
      <Container pt={12} maxW="container.xl" alignSelf="center">
        <Stack spacing={12}>
          <MotionHeading fontSize="10xl" textAlign="center">
            login now
          </MotionHeading>
          <Container alignSelf="center" maxW="container.md">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: {
                    values,
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login.user,
                      },
                    });
                  },
                });

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
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
                    loadingText="logging"
                  >
                    login
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

export default withApollo()(Login);
