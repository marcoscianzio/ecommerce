import { Text as ChrakraText, type TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Heading = motion<TextProps>(ChrakraText);

const MotionText: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Heading
      {...props}
      initial={{ opacity: 0, y: 15 }}
      //@ts-ignore
      transition={{
        type: "spring",
        delay: 0.5,
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

export default MotionText;
