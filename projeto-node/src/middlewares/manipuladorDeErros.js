import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next){
  if (err instanceof mongoose.Error.CastError)
    new RequisicaoIncorreta().enviarResposta(res);
  else if (err instanceof mongoose.Error.ValidationError)
    new ErroValidacao(err).enviarResposta(res);
  else if(err instanceof ErroBase)
    err.enviarResposta(res);
  else{

    console.log(err);
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;