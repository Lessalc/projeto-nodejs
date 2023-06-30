import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator:(valor) =>{
    return valor.trim() !== "";
  },
  message: ({path}) => `O campor ${path} foi fornecido em branco.`
});