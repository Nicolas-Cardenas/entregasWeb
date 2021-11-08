import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./cars.css";

function Cards() {
  let navigate = useNavigate();
  return (
    <div className="row Cards">
      <div className="col-3 d-flex justify-content-center">
        <div className="card">
          <img
            className="card-img-top"
            src="../../imagenes/cali.jpg"
            alt="Card image cap"
            id="caliImg"
          />
          <div className="card-body">
            <h3 className="card-title">&#160;&#160;&#160;&#160;&#160; Cali</h3>
            <br />
            <a
              className="btn btn-primary"
              id="buscarCardCali"
              onClick={() => {
                navigate("/buscarViajes", {
                  state: {
                    origen: "Bogota",
                    destino: "Cali",
                    fecha: "",
                    pasajeros: 2,
                  },
                });
              }}
            >
              Buscar
            </a>
          </div>
        </div>
      </div>
      <div className="col-3 d-flex justify-content-center">
        <div className="card">
          <img
            className="card-img-top"
            src="./imagenes/medellin.jpg"
            alt="Card image cap"
            id="medellinImg"
          />
          <div className="card-body">
            <h3 className="card-title">Medellin</h3>
            <br />
            <button
              className="btn btn-primary"
              id="buscarCardMedellin"
              onClick={() => {
                navigate("/buscarViajes", {
                  state: {
                    origen: "Bogota",
                    destino: "Medellin",
                    fecha: "",
                    pasajeros: 2,
                  },
                });
              }}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-3 d-flex justify-content-center">
        <div className="card">
          <img
            class="card-img-top"
            src="./imagenes/cartagena.jpg"
            alt="Card image cap"
            id="cartagenaImg"
          />
          <div className="card-body">
            <h3 className="card-title">Cartagena</h3>
            <br />

            <a
              className="btn btn-primary"
              id="buscarCardCartagena"
              onClick={() => {
                navigate("/buscarViajes", {
                  state: {
                    origen: "Bogota",
                    destino: "Cartagena",
                    fecha: "",
                    pasajeros: 2,
                  },
                });
              }}
            >
              Buscar
            </a>
          </div>
        </div>
      </div>
      <div className="col-3 d-flex justify-content-center">
        <div className="card">
          <img
            className="card-img-top"
            src="./imagenes/bogota.jpg"
            alt="Card image cap"
            id="bogotaImg"
          />
          <div className="card-body">
            <h3 className="card-title">&#160;&#160;&#160;Bogota</h3>
            <br />

            <a
              className="btn btn-primary"
              id="buscarCardCartagena"
              onClick={() => {
                navigate("/buscarViajes", {
                  state: {
                    origen: "Bogota",
                    destino: "Bogota",
                    fecha: "",
                    pasajeros: 2,
                  },
                });
              }}
            >
              Buscar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
