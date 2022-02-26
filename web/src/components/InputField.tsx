import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl variant="floating" isInvalid={!!error}>
      <Input {...field} {...props} id={field.name} placeholder=" " />
      <FormLabel htmlFor={field.name}>{field.name}</FormLabel>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
