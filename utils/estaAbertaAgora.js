const estaAbertaAgora = (farmacia) => {
    const agora = new Date();
    const diaSemana = agora.getDay(); // 0 = Domingo ... 6 = Sábado
    const horaAtual = agora.getHours();
  
    const horarios = farmacia.horarioFuncionamento?.[diaSemana];
    if (!horarios) return false;
  
    const [abertura, fechamento] = horarios; // Ex: [8, 20]
    return horaAtual >= abertura && horaAtual < fechamento;
  };
  
  export default estaAbertaAgora;
  