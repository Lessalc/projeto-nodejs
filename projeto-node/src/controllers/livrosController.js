import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, editoras, livros} from "../model/index.js";

class LivroController{

  static listarLivros = async (req, res, next) =>{
    try{
      const buscaLivros = livros.find().populate(["autor", "editora"]);
      req.resultado = buscaLivros;

      next();
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

  static buscarLivrosPorFiltro = async (req, res, next) => {
    try{
      const busca = await processaBusca(req.query);
      if(busca !== null){
        const buscaLivros = livros.find(busca).populate(["autor", "editora"]);
        req.resultado = buscaLivros;

        next();
      } else {
        res.status(200).send([]);
      }

    } catch(err) {
      next(err);
    }

  };

  
}

async function processaBusca(parametros){
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor, nomeEditora } = parametros;
  // const regex = new RegExp(titulo, "i");
  let busca ={};
  if(editora) busca.editora = editora;
  // if(titulo) busca.titulo = regex;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i"};
  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if(nomeAutor){
    const buscaNome = {};
    buscaNome.nome = {$regex: nomeAutor, $options: "i"};
    const autor = await autores.findOne( buscaNome);
    if(autor === null)
      busca = null;
    else 
      busca.autor = autor._id;
  }

  if(nomeEditora){
    const buscaNome = {};
    buscaNome.nome = {$regex: nomeEditora, $options: "i"};
    const editora = await editoras.findOne( buscaNome);
    if(editora === null)
      busca = null;
    else 
      busca.editora = editora._id;
  }

  return busca;
}

export default LivroController;