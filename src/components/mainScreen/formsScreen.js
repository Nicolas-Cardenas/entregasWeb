import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function FormsScreen() {
  const [data, setData] = useState({
    origen: "",
    destino: "",
    fecha: "",
    pasajeros: 0,
  });

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Sending data");
    delete data.confirmar;
    navigate("/buscarViajes", {
      state: {
        origen: data.origen,
        destino: data.destino,
        fecha: data.fecha,
        pasajeros: data.pasajeros,
      },
    });
  }

  function handleInputChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className="row form">
      <div className="col-1"></div>
      <div className="col-12">
        <form
          className="needs-validation"
          novalidate
          id="formMain"
          onSubmit={handleSubmit}
        >
          <div className="row form">
            <div className="col-md-5 mb-3">
              <label for="validationCustom01" id="origen">
                Origen
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Origen"
                name="origen"
                onChange={handleInputChange}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-5 mb-3">
              <label for="validationCustom02" id="destino">
                Destino
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom02"
                placeholder="Destino"
                name="destino"
                onChange={handleInputChange}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
          </div>
          <div className="row form">
            <div className="col-md-4 mb-3">
              <label for="validationCustom03" id="fecha">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="validationCustom03"
                placeholder="Fecha"
                name="fecha"
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Please provide a date.</div>
            </div>
            <div className="col-md-2 mb-3">
              <br />
              <label
                class="mr-sm-2"
                for="inlineFormCustomSelect"
                id="pasajeros"
              >
                Pasajeros
              </label>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                name="pasajeros"
                onChange={handleInputChange}
              >
                <option selected>Choose...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">4</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <button className="btn btn-primary" type="submit" id="buscarForm">
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-1"></div>
    </div>
  );
}

export default FormsScreen;
