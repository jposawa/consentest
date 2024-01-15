import { parametrosIniciais } from "../../constantes";
import { loadStorage } from "../../utils"

export const getParametros = (objetos) => {
  console.log("objetos", objetos);
  const parametrosLocal = loadStorage("parametrosCadastro", true);

  return parametrosLocal || parametrosIniciais;
}

export const postParametros = (body) => {
  console.log("Chamou post", body);
}