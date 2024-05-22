import { object, string } from "yup";

export const loginSchema = object().shape({
  email: string().required("se requiere Email ").email("email no valido"),
  password: string()
    .required("Contraseña requerida")
    .min(6, "Password must be at least 6 characters"),
});
 