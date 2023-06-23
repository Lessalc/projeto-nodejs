import autores from "../model/Autor.js"

class AutorController{

    static listarAutores = (req, res) =>{
        autores.find((err, autores) =>{
            if (err) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(200).json(autores);
            }
        })
    }

    static listarAutoresPorId = (req, res) =>{
        autores.findById(req.params.id, (err, autor) =>{
            if(err){
                res.status(400).send({message: `${err.message} - Id não encontrado`});
            } else {
                res.status(200).json(autor);
            }
        })
    }

    static cadastraAutor = (req, res) =>{
        let Autor = new autores(req.body);
        Autor.save((err) =>{
            if(err){
                res.status(500).send({message: `${err.message} - Falha ao cadastrar autor.`});
            } else {
                res.status(200).send(Autor.toJSON());
            }
        })
    }

    static atualizarAutor = (req, res) =>{
        let id = req.params.id;
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(err){
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message:"Autor atualizado com sucesso!"});
            }
        })
    }

    static deletaAutor = (req, res) =>{
        let id = req.params.id;
        autores.findByIdAndDelete(id, (err) =>{
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.status(200).send({message:"Autor excluido com sucesso!"});
            }
        })
    }
}

export default AutorController;