import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DetalleViaje(props) {

  const url = "https://carpoolingwebg1.herokuapp.com/api/viajes";
  const idViaje = 0;
  let [viaje, setViaje] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + `/${idViaje}`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setViaje(data);
      })
      .catch();
  }, []);

  viaje = {fecha: 1}
  return (
    <div className="col-lg" id="colCentral">
      <div id="cardRegistrar" className="card">
        <div className="card-body">
        <div class="col-md-">
            <h4>Dirección: {viaje.direccion}</h4>
            <h5>Precio: $ {viaje.precio}</h5>
            <h5>Fecha salida: {viaje.fecha}</h5>
            <h5>Tiempo: {viaje.tiempo}</h5>
            <h5>Finalizado: {viaje.terminado}</h5>
            <h5>Cupos: {viaje.numCupos}</h5>
            <h5>LLeno: {viaje.lleno}</h5>
          </div>
        </div>
        </div>
    </div>
  );
}

export default DetalleViaje;
