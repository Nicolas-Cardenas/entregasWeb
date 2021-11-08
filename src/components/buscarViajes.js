import React, { useEffect, useState } from "react";
import * as Joi from "joi";
import { useLocation } from "react-router-dom";

function BuscarViajes(props) {
  const url = "https://carpoolingwebg1.herokuapp.com/api";
  const { state } = useLocation();
  const [viajesCompletos, setViajesCompletos] = useState([]);

  const [viajes, setViajes] = useState([]);
  const [paradas, setParadas] = useState([]);
  const [filtro, setFiltro] = useState({
    origen: state.origen,
    destino: state.destino,
    fecha: state.fecha,
    pasajeros: state.pasajeros,
  });

  let loginData = {
    username: "admin",
    password: "password",
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/viajes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setViajesCompletos(data);
        setViajes(data);
        const requestOptions2 = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        };
        fetch(url + "/login", requestOptions2)
          .then((res) => res.json())
          .then((json) => json.token)
          .then((token) => {
            const requestOptions3 = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            };
            fetch(url + "/paradas", requestOptions3)
              .then((response2) => response2.json())
              .then((data2) => {
                setParadas(data2);
                console.log("Holi");
              })
              .catch();
          })
          .catch();
      })
      .catch();
  }, []);

  function filtrar() {
    console.log(paradas);
    let origenes = [];
    let destinos = [];
    let localId = 0;
    paradas.forEach((parada) => {
      if (parada.ViajeId === localId) {
        if (parada.ciudad.includes(filtro.destino)) {
          destinos.push(parada);
        }
      } else {
        if (parada.ciudad.includes(filtro.origen)) {
          origenes.push(parada);
        }
        localId = parada.ViajeId;
      }
    });
    let viajesFiltrados = [];
    console.log("Completos", viajesCompletos);
    viajesCompletos.forEach((viaje) => {
      origenes.forEach((origen) => {
        if (origen.ViajeId === viaje.id) {
          viajesFiltrados.push(viaje);
        }
      });
    });
    console.log("filtrados", viajesFiltrados);
    let viajesFiltrados2 = [];

    viajesFiltrados.forEach((viaje) => {
      destinos.forEach((destino) => {
        if (destino.ViajeId === viaje.id) {
          if (filtro.pasajeros === 0) {
            viajesFiltrados2.push(viaje);
          } else {
            if (viaje.pasajeros >= filtro.pasajeros) {
              viajesFiltrados2.push(viaje);
            }
          }
        }
      });
    });

    console.log(viajesFiltrados2);
    setViajes(viajesFiltrados2);
  }
  let reserva={
    codigo: "123awsdsds31",
    //PasajeroId: null,
    ViajeId: 1
  };
  function handleReservar(ViajeIdRes){
    //e.preventDefault();
    reserva={
      codigo: "123awsdsds31",
    //PasajeroId: null,
    ViajeId: ViajeIdRes}

    let data = {
      username: "admin",
      password: "password",
    };
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("https://carpoolingwebg1.herokuapp.com/api/login", {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => json.token)
      .then(async (token) => {
        let myHeaders2 = new Headers();
        myHeaders2.append("Authorization", "Bearer " + token);
        myHeaders2.append("Content-Type", "application/json");

        await fetch("https://carpoolingwebg1.herokuapp.com/api/reservas", {
          method: "POST",
          body: JSON.stringify(reserva),
          headers: myHeaders2,
        })
          .then((res) => res.json())
          .catch(alert);
      });

      displayModal()
  }

  function HandleSubmit(e) {
    e.preventDefault();
    filtrar();
  }

  function handleInputChange(event) {
    setFiltro({ ...filtro, [event.target.name]: event.target.value });
  }

  function displayModal(){
    //Despliegue el modal cuando se cree el viaje
    let btnReservar = document.getElementById("botonReservar");
    btnReservar.setAttribute("data-toggle", "modal");
    btnReservar.setAttribute("data-target", "#modalCreacionViaje");
  }

  const renderViajes = (viajes, index) => {
    return (
      <div className="card">
        <div className="container row">
          <div className="col-sm-2">
            <img
              scr="https://via.placeholder.com/150"
              className="rounded float-left"
              alt=""
            />
          </div>
          <div className="col-sm">
            <h4>{viajes.direccion}</h4>
            <h5>Precio: $ {viajes.precio}</h5>
            <h5>Fecha salida: {viajes.fecha}</h5>
          </div>
          <div className="col-sm-3">
            <button type="submit" className="btn-primary btn-block btn-lg" id="botonReservar" onClick={() => handleReservar(viajes.id)}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="contenedorBody" className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <form id="formBusqueda" onSubmit={HandleSubmit}>
                <div className="form-group">
                  <label htmlFor="inputOrigen">Origen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOrigen"
                    placeholder=""
                    name="origen"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputDestino">Destino</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDestino"
                    placeholder=""
                    name="destino"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputFecha">Fecha de viaje</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputFecha"
                    placeholder=""
                    name="fecha"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPasajeros">Número de pasajeros</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPasajeros"
                    placeholder=""
                    name="pasajeros"
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  id="buscarViajes"
                  type="submit"
                  className="btn-primary btn-block btn-lg"
                >
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8" id="viajesList">
        {viajes.map(renderViajes)}
      </div>

      <div
        className="modal fade"
        id="modalCreacionViaje"
        tabIndex="-1"
        role="dialog"
        style={{ opacity: 1 }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reserva registrada con exito para el viaje con ID: {reserva.ViajeId}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-footer">
              <div className="row">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-dismiss="modal"
                    id="btnModalViajeOk"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default BuscarViajes;
