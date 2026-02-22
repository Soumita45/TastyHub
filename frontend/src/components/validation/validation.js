import * as yup from "yup";

export const addFoodSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .required("Food name is required"),

  description: yup
    .string()
    .required("Description is required"),

  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),

  category: yup
    .string()
    .required("Category is required"),

  foodType: yup
    .string()
    .oneOf(["veg", "non-veg"], "Food type must be veg or non-veg")
    .required("Food type is required"),

  ingredients: yup
    .string()
    .required("Ingredients is required"),

});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),

  role: yup
    .string()
    .oneOf(["user", "admin"], "Role must be user or admin")
    .notRequired()
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
});