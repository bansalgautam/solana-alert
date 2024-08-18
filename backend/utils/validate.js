import z from "zod";

export const signupFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1),
});

export const alertSchema = z.object({
  address: z.string().min(32),
});

const validateSchema = (schema, data) => {
  try {
    schema.parse(data);
    return { isValid: true };
  } catch (error) {
    return { isValid: false };
  }
};

export const validateSignupForm = (data) => {
  return validateSchema(signupFormSchema, data);
};

export const validateLoginForm = (data) => {
  return validateSchema(loginFormSchema, data);
};

export const validateAlertForm = (data) => {
  return validateSchema(alertSchema, data);
};
