import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livros} from "../model/index.js";

class LivroController{

  static listarLivros = async (req, res, next) =>{
    try{
      const livrosResultados =  await livros.find().populate(["autor", "editora"]).exec();
      res.status(200).json(livrosResultados);
    } catch(err){
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) =>{
    try{
      const livroResultados =  await livros.findById(req.params.id).populate(["autor", "editora"]).exec();
      if (livroResultados !== null)
        res.status(200).json(livroResultados);
      else
        next(new NaoEncontrado("Livro não foi encontrado"));
    } catch(err){
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) =>{
    try{
      let Livro = new livros(req.body);
      const livroResultados =  await Livro.save();
      res.status(200).send(livroResultados.toJSON());
    } catch(err){
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      const livroResultados =  await livros.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
      if (livroResultados !== null)
        res.status(200).send(livroResultados.toJSON());
      else
        next(new NaoEncontrado("Livro não encontrado"));
    } catch(err){
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{
      const livroResultados = await livros.findByIdAndDelete(req.params.id);
      if (livroResultados !== null)
        res.status(200).send({message: "Livro removido com sucesso!"});
      else
        next(new NaoEncontrado("Livro não encontrado"));
    } catch(err){
      next(err);
    }   
  };

  static buscarLivrosPorEditora = async (req, res, next) => {
    try{
      const editora = req.query.editora;
      const livrosEncontrados = await livros.find({"editora": editora}).populate(["autor", "editora"]).exec();
      if (livrosEncontrados !== null)
        res.status(200).json(livrosEncontrados);
      else
        next(new NaoEncontrado("Nenhum livro foi encontrado"));

    } catch(err) {
      next(err);
    }

  };
}

export default LivroController;