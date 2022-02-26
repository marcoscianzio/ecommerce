import { Heading as ChakraHeading, type HeadingProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Heading = motion<HeadingProps>(ChakraHeading);

const MotionHeading: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading
      {...props}
      initial={{ opacity: 0, y: 15 }}
      //@ts-ignore
      transition={{
        type: "spring",
        delay: 0.25,
        damping: 100,
        mass: 4,
        stiffness: 300,
      }}
      animate={{ y: 0, opacity: 1 }}
    >
      {children}
    </Heading>
  );
};

export default MotionHeading;
