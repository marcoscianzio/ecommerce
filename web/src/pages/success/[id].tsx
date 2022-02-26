import { withApollo } from "../../utils/withApollo";

interface SuccessProps {}

const Success: React.FC<SuccessProps> = ({}) => {
  return <div>s</div>;
};

export default withApollo()(Success);
