//Importar librerias de React
import React, { useState } from "react";
import ReactDOM from "react-dom";
//import styles from '.../public/assets/main.css';
import { useNavigate, useLocation } from "react-router-dom";

//Importar joi
//import * as Joi from "joi";
//import Perfil from "./perfil";
//import { json } from "express";

function CrearViaje(props) {
  //const url = "https://carpoolingwebg1.herokuapp.com/api/";
  const { state } = useLocation();
 

  //Estado que representa el viaje a crear
  const [viaje, setData] = useState({
    // origen: "",
    // destino: "",
    fecha: "",
    //horaSalida:"",
    direccion: "",
    precio: 0,
    tiempo: 0,
    terminado: false,
    numCupos: 0,
    lleno: false,
  });

  //RECIBBIR estado de PROFILE QUE LE MANDA EL COMPONENTE PERFIL
  let conductor = state.profile;
  if (!conductor) {
    conductor = {
      nombre: "Jairo Perez (Prueba)",
      correo: "jairo@gmail.com",
      cedula: 6789,
      celular: 345678,
      contrasena: "oeoe",
      confirmar: "oeoe",
      foto: "cond.com",
      ViajeId:null,
    };
  }

  //Estado que representa el origen del viaje
  const [origen, setOrigen] = useState({
    ciudad: "",
    direccion: "cra 1",
    coordenadaX: 0,
    coordenadaY: 0,
    ViajeId: 1,
  });

  //Estado que representa el destino del viaje
  const [destino, setDestino] = useState({
    ciudad: "",
    direccion: "",
    coordenadaX: 0,
    coordenadaY: 0,
    ViajeId: 1,
  });

  function setViajesId(idV) {
    setOrigen({ ...origen, ViajeId: idV });
    setDestino({ ...destino, ViajeId: idV });
    conductor["ViajeId"]= idV;
    //console.log(idV);
  }

  let btnCrearViaje = document.getElementById("crear_viaje_boton");
  //validacion de datos
  /*
    const schema = Joi.object({
        origen: Joi.string().required(),
        destino: Joi.string().required(),
        fecha: Joi.date().required(),
        tiempo: Joi.number().required(),
        numCupos: Joi.number().required()
    })
    */
  //Funcion que maneja cuando se submitea un viaje
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Sending data");
    let form = document.getElementById("formulario_crear_viaje");
    let formData = new FormData(form);
    formData.delete("confirmar");
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

        //crear el viaje
          await fetch("https://carpoolingwebg1.herokuapp.com/api/viajes", {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: myHeaders2,
        })
          .then((res) => res.json())
          .then(
            (json) => setViajesId(json.id),
          ).then()
          .catch(alert);

       //modifica el conductor
       /*
        fetch("https://carpoolingwebg1.herokuapp.com/api/conductores/"+conductor.id,{
          method: "PUT",
          body: JSON.stringify(conductor),
          headers: myHeaders2,
       })
       .then()
       .catch(alert);
       */
      modificarCond(myHeaders2,function(){ 
        fetch("https://carpoolingwebg1.herokuapp.com/api/paradas", {
          method: "POST",
          body: JSON.stringify(origen),
          headers: myHeaders2,
        })
          .then()
          .catch(alert);

      fetch("https://carpoolingwebg1.herokuapp.com/api/paradas", {
        method: "POST",
        body: JSON.stringify(destino),
        headers: myHeaders2,
      })
        .then()
        .catch(alert);
        })

      /*
        //crea el origen
        fetch("https://carpoolingwebg1.herokuapp.com/api/paradas", {
          method: "POST",
          body: JSON.stringify(origen),
          headers: myHeaders2,
        })
          .then()
          .catch(alert);

        //crea el destino
        fetch("https://carpoolingwebg1.herokuapp.com/api/paradas", {
          method: "POST",
          body: JSON.stringify(destino),
          headers: myHeaders2,
        })
          .then()
          .catch(alert);
*/
        displayModal()
      });
    
  }

  function modificarCond(headersP,_callback){
    fetch("https://carpoolingwebg1.herokuapp.com/api/conductores/"+conductor.id,{
      method: "PUT",
      body: JSON.stringify(conductor),
      headers: headersP,
   })
   .then()
   .catch(alert);

   _callback()

  }


  function displayModal(){
    //Despliegue el modal cuando se cree el viaje
   
    btnCrearViaje.setAttribute("data-toggle", "modal");
    btnCrearViaje.setAttribute("data-target", "#modalCreacionViaje");
  }
  function handleInputChange(event) {
    // eslint-disable-next-line no-restricted-globals
    setData({ ...viaje, [event.target.name]: event.target.value });
  }

  function handleOrigen(event) {
    // eslint-disable-next-line no-restricted-globals
    setOrigen({ ...origen, ciudad: event.target.value });
  }

  function handleDestino(event) {
    // eslint-disable-next-line no-restricted-globals
    setDestino({ ...destino, ciudad: event.target.value });
  }

  function handleDestinoDireccion(event) {
    // eslint-disable-next-line no-restricted-globals
    setDestino({ ...destino, direccion: event.target.value });
  }

  //componente a renderizar
  //Formulario creacion de un viaje
  return (
    <div className="d-flex justify-content-center" id="container_crear_viaje">
      <form id="formulario_crear_viaje" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <p>Nombre: {conductor.nombre}</p>
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            <p>Correo: {conductor.correo}</p>
          </div>
          <h2 style={{ textAlign: "center" }}>Crear Viaje</h2>
          <div className="form-group col-lg-6">
            <label htmlFor="inputOrigen">Origen</label>
            <input
              className="form-control"
              id="inputOrigen"
              placeholder="Origen del viaje"
              //name="origen"
              onChange={handleOrigen}
              //required
            />
          </div>
          <div className="form-group col-lg-6">
            <label htmlFor="inputDestino">Destino</label>
            <input
              className="form-control"
              id="inputDestino"
              //name="destino"
              placeholder="Destino final del viaje"
              onChange={handleDestino}
              //required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-4">
            <label htmlFor="inputFecha">Fecha</label>
            <input
              className="form-control"
              id="inputFecha"
              placeholder="Fecha del viaje"
              type="date"
              name="fecha"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-lg-4">
            <label htmlFor="inputHora">Hora Salida</label>
            <input
              className="form-control"
              id="inputHora"
              placeholder="Hora salida del viaje"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-lg-4">
            <label htmlFor="inputDireccion">Direccion</label>
            <input
              className="form-control"
              id="inputDireccion"
              placeholder="Direccion final viaje"
              name="direccion"
              onChange={(handleInputChange, handleDestinoDireccion)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-4">
            <label htmlFor="inputCupos">Cupos</label>
            <input
              className="form-control"
              id="inputCupos"
              placeholder="Cupos disponibles"
              onChange={handleInputChange}
              name="numCupos"
              required
            />
          </div>
          <div className="form-group col-lg-4">
            <label htmlFor="precio">Precio</label>
            <input
              className="form-control"
              id="precio"
              placeholder="Precio"
              onChange={handleInputChange}
              name="precio"
              required
            />
          </div>
          <div className="form-group col-lg-4">
            <label htmlFor="inputDuracion">Duracion viaje</label>
            <input
              className="form-control"
              id="inputDuracion"
              placeholder="Duracion"
              name="tiempo"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-lg-3" style={{ display: "none" }}>
            <label htmlFor="inputTerminado">Terminado</label>
            <input
              className="form-control"
              id="inputTerminado"
              name="terminado"
              defaultValue="false"
            />
          </div>
          <div className="form-group col-lg-3" style={{ display: "none" }}>
            <label htmlFor="inputcupos">Cupos llenos</label>
            <input
              className="form-control"
              id="inputcupos"
              name="lleno"
              defaultValue="false"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group form-select-lg col-lg" id="inputVehiculo">
            <label htmlFor="inputVehiculo">Vehiculo</label>
            <select className="form-control" required>
              <option>Mazda 3</option>
              <option>Toyota Hilux</option>
              <option>Tweezy</option>
              <option>Audi A5</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-check col-lg-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="viajeTerminadoCheck"
              disabled
            />
            <label className="form-check-label" htmlFor="viajeTerminadoCheck">
              ¿Finalizo el viaje?
            </label>
          </div>

          <div className="form-check col-lg-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="cuposLlenosCheck"
              disabled
            />
            <label className="form-check-label" htmlFor="cuposLlenosCheck">
              ¿Cupos llenos?
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="text-center">
              <button
                id="salir_viaje_boton"
                className="btn-primary btn-block btn-lg"
              >
                Salir
              </button>
            </div>
          </div>
          <div className="col">
            <div className="text-center">
              <button
                id="crear_viaje_boton"
                type="submit"
                className="btn-primary btn-block btn-lg"
              >
                Crear Viaje
              </button>
            </div>
          </div>
        </div>
      </form>
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
              <h5 className="modal-title">Viaje registrado con exito</h5>
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

export default CrearViaje;
