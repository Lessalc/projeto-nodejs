import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../model/index.js";

class AutorController{

  static listarAutores = async (req, res, next) =>{
    try{
      const buscaAutores = autores.find();
      req.resultado = buscaAutores;
      next();
    } catch(err){
      next(err);
    }
  };

  static listarAutoresPorId = async (req, res, next) =>{
    try{
      const autorResultado = await autores.findById(req.params.id);
      if (autorResultado !== null)
        res.status(200).json(autorResultado);
      else
        next(new NaoEncontrado("Id não foi encontrado"));
    } catch(err){
      next(err);
    }
 
  };

  static cadastraAutor = async (req, res, next) =>{
    try {
      let Autor = new autores(req.body);
      const autorResultado = await Autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) =>{
    try {
      let id = req.params.id;
      const autorAtualizado = await autores.findByIdAndUpdate(id, {$set: req.body}, {new:true});
      if (autorAtualizado !== null)
        res.status(200).send(autorAtualizado.toJSON());
      else
        next(new NaoEncontrado("Id não foi encontrado"));
    } catch (err){
      next(err);
    }
  };

  static deletaAutor = async (req, res, next) =>{
    try {
      let id = req.params.id;
      const autorExcluido = await autores.findByIdAndDelete(id);
      if(autorExcluido !== null)
        res.status(200).send({message:"Autor excluido com sucesso!"});
      else
        next(new NaoEncontrado("Id não foi encontrado"));
    } catch (err){
      next(err);
    }
  };
}

export default AutorController;