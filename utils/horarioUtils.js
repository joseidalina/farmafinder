// src/utils/horarioUtils.js

export function estaAbertaAgora(farmacia) {
    const agora = new Date();
    const diaSemana = agora.getDay();
    const horaAtual = agora.getHours() + agora.getMinutes() / 60;
    const dataHoje = agora.toISOString().split("T")[0];
  
    const horarios = farmacia.horario;
  
    const feriadoHoje = horarios.feriados?.find(f => f.data === dataHoje);
    if (feriadoHoje) {
      if (!feriadoHoje.abre || !feriadoHoje.fecha) return false;
      const [hAbre, mAbre] = feriadoHoje.abre.split(":").map(Number);
      const [hFecha, mFecha] = feriadoHoje.fecha.split(":").map(Number);
      const abre = hAbre + mAbre / 60;
      const fecha = hFecha + mFecha / 60;
      return horaAtual >= abre && horaAtual <= fecha;
    }
  
    let periodo;
    if (diaSemana === 0) periodo = horarios.domingo;
    else if (diaSemana === 6) periodo = horarios.sabado;
    else periodo = horarios.seg_sex;
  
    if (!periodo || !periodo.abre || !periodo.fecha) return false;
  
    const [hAbre, mAbre] = periodo.abre.split(":").map(Number);
    const [hFecha, mFecha] = periodo.fecha.split(":").map(Number);
    const abre = hAbre + mAbre / 60;
    const fecha = hFecha + mFecha / 60;
  
    return horaAtual >= abre && horaAtual <= fecha;
  }
  