import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{
  constructor(err){
    const mensagemErro = Object.values(err.errors)
      .map(erro => erro.message).join("; ");
    
    super(`Os seguintes erros foram encontrados: ${mensagemErro}`, 400);
  }
}

export default ErroValidacao;