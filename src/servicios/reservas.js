function crearServicioreservas(reservasIniciales) {
  const reservas = [...reservasIniciales];
  function listar() {
    return [...reservas];
  }


  function crear(datosValidados) {
    const ultimoId = reservas.reduce(
      (mayor, reserva) => Math.max(mayor, reserva.id),
      0,
    );
    const nuevo = { id: ultimoId + 1, ...datosValidados };
    reservas.push(nuevo);
    return nuevo;
  }



  return { listar, contar, crear };
}
module.exports = { crearServicioreservas };
