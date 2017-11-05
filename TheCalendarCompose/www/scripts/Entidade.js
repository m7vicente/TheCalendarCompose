function Usuario(id, user, pessoa, senha, nasc, email, celular, rua, cidade, estado, cep, data) {
    this.id_pessoa = id;
    this.nomeUsuario = user;
    this.nomePessoa = pessoa;
    this.senha = senha;
    this.nascimento = nasc;
    this.email = email;
    this.celular = celular;
    this.endereco_rua = rua;
    this.endereco_cidade = cidade;
    this.endereco_estado = estado;
    this.endereco_cep = cep;
    this.data_cadastro = data;
    this.entrou = false;
}

function Servico(idServico,idPrestador, nomeServico, descricao_servico,categoria ,valor_servico, servico_ativo, imagem) {
    this.idServico = idServico;
    this.idPrestador = idPrestador;
    this.nomeServico = nomeServico;
    this.descricao_servico = descricao_servico;
    this.valor_servico = valor_servico;
    this.servico_ativo = servico_ativo;
    this.categoria = categoria;
    this.imagem = imagem;
}