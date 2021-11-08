import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VerViajesConductor() {
  const url = "https://carpoolingwebg1.herokuapp.com/api/viajes";
  const [viajes, setViajes] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setViajes(data);
      })
      .catch();
  }, []);

  const renderViajes = (viajes, index) => {
    console.log(viajes);

    return (
      <div id="cardRegistrar" className="card">
        <div className="container row">
          <div className="col">
            <img
              scr="https://via.placeholder.com/150"
              className="rounded float-left"
              alt=""
            />
          </div>
          <div className="col">
            <h4>{viajes.direccion}</h4>
            <h5>Precio: $ {viajes.precio}</h5>
            <h5>Fecha salida: {viajes.fecha}</h5>
          </div>
          <div className="col justify-content-center">
            <button type="submit" className="btn-primary btn-block btn-lg">
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <div className="col" id="colCentral">{viajes.map(renderViajes)}</div>;
}

export default VerViajesConductor;
