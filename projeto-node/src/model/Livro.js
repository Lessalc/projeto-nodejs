import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  { 
    id: {type: String},
    titulo: {type: String, required:  [true, "O nome do livro é obrigatório!"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required:  [true, "A referência para Autor(a) deve ser indicada!"]},
    editora: {
      type: mongoose.Schema.Types.ObjectId, ref: "editoras", 
      required:  [true, "A referência para editora deve ser indicada!"]},
    numeroPaginas: {type: Number, min: [10, "O número de páginas deve estar entre 10 e 5000, valor fornecido {VALUE}"], 
      //max: [5000, "O número de páginas deve estar entre 10 e 5000, valor fornecido {VALUE}"]}
      validate:{
        validator: (valor)=> {
          return valor >= 10 && valor <=5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000, valor fornecido {VALUE}"
      }
    }
  } 
);

const livros = mongoose.model("livros", livroSchema);

export default livros; 