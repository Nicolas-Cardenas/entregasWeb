import React, { useState } from "react";
import * as Joi from "joi";
import { useLocation, useNavigate } from "react-router";

function RegistrarVehiculo(props) {
  const url = "https://carpoolingwebg1.herokuapp.com/api";
  const { state } = useLocation();
  const [data, setData] = useState({
    placa: "",
    tipo: "",
    modelo: "",
    foto: "",
  });
  let navigate = useNavigate();

  const schema = Joi.object({
    foto: Joi.string().required(),
    placa: Joi.string().required(),
    modelo: Joi.string().required(),
    tipo: Joi.string().required(),
  });

  function handleSubmit(event) {
    event.preventDefault();
    const { error } = schema.validate(data);
    if (error) {
      console.log(error.message);
    } else {
      console.log("Sending data");
      data.ConductorId = state.ConductorId;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(url + "/vehiculos", requestOptions)
        .then((res) => res.json())
        .then((json) =>
          navigate("/perfil", {
            replace: true,
            state: {
              correo: state.correo,
              contrasena: state.contrasena,
              VehiculoId: json.id,
            },
          }),
        )
        .catch(alert);
    }
  }

  function handleInputChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className="container">
      <div id="cardRegistrar" className="card">
        <div className="card-body">
          <form id="registrarForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="inputTipo" className="registro-vehiculo">
                  Tipo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTipo"
                  placeholder="Tipo de vehiculo (ej. carro, van)"
                  name="tipo"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <label htmlFor="inputPlaca" className="registro-vehiculo">
                Placa
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPlaca"
                placeholder="Placa del vehiculo"
                name="placa"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputModelo" className="registro-vehiculo">
                Modelo
              </label>
              <input
                type="text"
                className="form-control"
                id="inputModelo"
                placeholder="Modelo del vehiculo"
                name="modelo"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputFoto" className="registro-vehiculo">
                Foto
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFoto"
                placeholder="URL Foto del vehiculo"
                name="foto"
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              id="btnRegistrar"
              type="submit"
              className="btn-primary btn-block btn-lg"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrarVehiculo;
