import React, { useState } from "react";
import * as Joi from "joi";
import { useNavigate } from "react-router-dom";

function RegistrarConductor() {
  const url = "https://carpoolingwebg1.herokuapp.com/api";
  const [data, setData] = useState({
    nombre: "",
    correo: "",
    cedula: 0,
    celular: 0,
    contrasena: "",
    confirmar: "",
    foto: "",
  });
  let navigate = useNavigate();
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    celular: Joi.number().required(),
    cedula: Joi.number().required(),
    correo: Joi.string().required(),
    contrasena: Joi.string().min(5).max(15).required(),
    edad: Joi.number().required(),
    foto: Joi.string().required(),
    confirmar: Joi.any()
      .equal(Joi.ref("contrasena"))
      .required()
      .messages({ "any.only": "Las contraseñas no coinciden." }),
  });

  function handleSubmit(event) {
    event.preventDefault();
    const { error } = schema.validate(data);
    if (error) {
      console.log(error.message);
    } else {
      console.log("Sending data");
      delete data.confirmar;
      const requestOptions2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(url + "/conductores", requestOptions2)
        .then((res) => res.json())
        .then((json) =>
          navigate("/registrarVehiculo", {
            state: {
              correo: data.correo,
              contrasena: data.contrasena,
              ConductorId: json.id,
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
              <label htmlFor="inputNombre" className="registro-conductor">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNombre"
                placeholder="Nombre"
                name="nombre"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCorreo" className="registro-conductor">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="Correo Electrónico"
                name="correo"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputId" className="registro-conductor">
                Identificación
              </label>
              <input
                type="number"
                className="form-control"
                id="inputId"
                placeholder="Identificación"
                name="cedula"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputFecha" className="registro-conductor">
                Edad
              </label>
              <input
                type="number"
                className="form-control"
                id="inputFecha"
                placeholder="Edad"
                name="edad"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCelular" className="registro-conductor">
                Celular
              </label>
              <input
                type="number"
                className="form-control"
                id="inputCelular"
                placeholder="Celular"
                name="celular"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPass1" className="registro-conductor">
                Contraseña Minima Longitud: 5
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPass1"
                placeholder="Contraseña"
                name="contrasena"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPass2" className="registro-conductor">
                Confirmar Contraseña Minima Longitud: 5
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPass2"
                placeholder="Confirmar Contraseña"
                name="confirmar"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputFoto" className="registro-conductor">
                Foto
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFoto"
                placeholder="URL Foto"
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

export default RegistrarConductor;
