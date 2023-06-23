import editoras from "../model/Editora.js";

class EditoraController{

    static listarEditoras = (req, res) => {
        editoras.find((err, editoras) =>{
            if(err){
                res.status(500).send({message: err.message}); 
            } else {
                res.status(200).json(editoras);
            }
        })
    }

    static listarEditoraPorId = (req, res) => {
        let id = req.params.id;
        editoras.findById(id, (err, editora) => {
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.status(200).json(editora);
            }
        })
    }
            
    static cadastrarEditora = (req, res) => {
        let Editora = new editoras(req.body);
        Editora.save((err) => {
            if(err){
                res.status(500).send({message: err.message});
            } else {
                res.status(201).send(Editora.toJSON())
            }
        })
    }

    static atualizarEditora = (req, res) =>{
        editoras.findByIdAndUpdate(req.params.id, {$set: req.body}, (err) =>{
            if(err){
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message:"Editora atualizada com sucesso!"});
            }
        })
    }

    static deletaEditora = (req, res) =>{
        editoras.findByIdAndDelete(req.params.id, (err) =>{
            if(err){
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message:"Editora excluida com sucesso!"});
            }
        })
    } 
}

export default EditoraController;