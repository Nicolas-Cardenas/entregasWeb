import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import * as Joi from "joi";
import { useNavigate } from "react-router-dom";
import "./headerScreen.css";

function HeaderScreen() {
  const url = "https://carpoolingwebg1.herokuapp.com/api";
  const [data, setData] = useState({
    modal1: false,
    modal2: false,
    login: false,
  });

  const [data2, setData2] = useState({
    nombre: "",
    celular: 0,
    correo: "",
    contrasena: "",
    edad: 0,
  });

  const [data3, setData3] = useState({
    correo: "",
    contrasena: "",
  });

  let navigate = useNavigate();

  function RegistrarseModal() {
    //console.log("open");
    setData({ modal1: true, modal2: false, login: false });
  }

  const handleClose = () =>
    setData({ modal1: false, modal2: false, login: false });

  function iniciarSesionModal() {
    setData({ modal1: false, modal2: true, login: false });
  }

  function handleInputChange(event) {
    setData2({ ...data2, [event.target.name]: event.target.value });
    console.log(event.target.name);
    console.log(event.target.value);
    console.log(data2);
  }

  function handleInputChange2(event) {
    setData3({ ...data3, [event.target.name]: event.target.value });
    console.log(event.target.name);
    console.log(event.target.value);
    console.log(data3);
  }

  function iniciarSesion() {
    setData({ modal1: false, modal2: false, login: true });
    navigate("/perfil", {
      state: {
        correo: data3.correo,
        contrasena: data3.contrasena,
      },
    });
  }

  function registrarse() {
    let dataLogin = {
      username: "admin",
      password: "password",
    };
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("https://carpoolingwebg1.herokuapp.com/api/login", {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify(dataLogin),
    })
      .then((res) => res.json())
      .then((json) => json.token)
      .then((token) => {
        console.log(token);
        let myHeaders2 = new Headers();
        myHeaders2.append("Authorization", "Bearer " + token);
        myHeaders2.append("Content-Type", "application/json");
        console.log(data2);
        fetch(url + "/pasajeros", {
          headers: myHeaders2,
          method: "POST",
          body: JSON.stringify(data2),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setData({ modal1: false, modal2: false, login: true });
            navigate("/perfil", {
              state: {
                correo: data2.correo,
                contrasena: data2.contrasena,
                PasajeroId: json.id,
              },
            });
          });
      })
      .catch(alert);
  }

  return (
    <div>
      <header>
        <div className="header">
          <nav className="navbar navbar-light">
            <div className="container-fluid">
              <Link to="/">
                <div className="navbar-brand">
                  <img
                    src="./imagenes/logocarro.png"
                    width="60"
                    height="50"
                    alt=""
                  />
                </div>
              </Link>
              <Link to="/">
                <div className="navbar-brand">
                  <img
                    src="./imagenes/logoletras.png"
                    width="100%"
                    height="50"
                    alt=""
                  />
                </div>
              </Link>
              <div className="collapse navbar-collapse"></div>
              <div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-e"></ul>
                <div className="row">
                  <div className="col">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item" id="numeroItems">
                        {!data.login ? (
                          <div>
                            <button
                              className="navbar brand"
                              id="Registrarse"
                              onClick={RegistrarseModal}
                            >
                              Registrarse
                            </button>
                          </div>
                        ) : null}
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item" id="numeroItems">
                        {!data.login ? (
                          <button
                            className="navbar brand"
                            id="InicioSesion"
                            onClick={iniciarSesionModal}
                          >
                            Iniciar sesión
                          </button>
                        ) : null}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Modal show={data.modal1} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="row">
              <div className="col-7">
                <h5 className="modal-title">Crea tu cuenta</h5>
              </div>
              <div className="col-2">
                <div>&nbsp;</div>
              </div>
              <div className="col-3">
                <h5 style={{ "text-align": "right" }} id="nombreModal">
                  TeLlevo.com
                </h5>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="validationCustom03" id="nombreModal">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            placeholder="Nombre"
            name="nombre"
            onChange={handleInputChange}
            required
          />
          <label for="validationCustom03" id="celularModal">
            Celular
          </label>
          <input
            type="number"
            className="form-control"
            id="validationCustom03"
            placeholder="Celular"
            name="celular"
            onChange={handleInputChange}
            required
          />
          <label for="validationCustom03" id="correoModal">
            Correo
          </label>
          <input
            type="text"
            className="form-control"
            id="correoIdRegistro"
            placeholder="Correo@hotmail.com"
            name="correo"
            onChange={handleInputChange}
            required
          />

          <label for="validationCustom03" id="contraseñaModal">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="contraseñaIdRegistro"
            placeholder="Contraseña"
            name="contrasena"
            onChange={handleInputChange}
            required
          />
          <label for="validationCustom03" id="edadModal">
            Edad
          </label>
          <input
            type="number"
            className="form-control"
            id="validationCustom03"
            placeholder="Edad"
            name="edad"
            onChange={handleInputChange}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={registrarse}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={data.modal2} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="modal-title">Bienvenido a tu próximo viaje</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="validationCustom02" id="correoModal">
            Correo
          </label>
          <input
            type="text"
            className="form-control"
            id="correoId"
            placeholder="Correo@hotmail.com"
            onChange={handleInputChange2}
            name="correo"
            required
          />

          <label for="validationCustom03" id="contraseñaModal">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="contraseñaId"
            placeholder="Contraseña"
            onChange={handleInputChange2}
            name="contrasena"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={iniciarSesion}>
            Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HeaderScreen;
