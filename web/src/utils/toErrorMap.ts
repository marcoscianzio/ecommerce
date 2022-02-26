import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap = [] as any;

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
