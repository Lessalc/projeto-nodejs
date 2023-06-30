import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: [true, "O nome da editora é obrigatório!"], 
      enum:{
        values:["Editora A", "Editora B"],
        message:"{VALUE} não é permitida"
      }},
    cnpj: {type: String, required: [true, "O CNPJ da editora é obrigatório!"]}
  },
  {
    versionKey: false
  }
);

const editoras = mongoose.model("editoras", editoraSchema);

export default editoras;