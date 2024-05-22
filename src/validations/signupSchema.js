import { object, string, ref } from "yup";

export const signupSchema = object().shape({
  email: string().required("Email es requerido").email("Email no valido"),
  password: string()
    .required("Contraseña requerida")
    .min(6, "La contraseña debe tener mas de 6 caracteres"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Las contraseñas no coinciden")
    .required(),
});
 