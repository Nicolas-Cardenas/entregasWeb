import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function Qconductor() {
  let navigate = useNavigate();
  return (
    <div className="row conductor">
      <div className="col-12 d-flex justify-content-center">
        <nav className="navbar navbar-light" id="navConductor">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="./imagenes/manubrio.png"
                width="60"
                height="50"
                alt=""
                id="manubrioImg"
              />
            </a>
            <div className="collapse navbar-collapse"></div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-e"></ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" id="numeroItems">
                <h4 id="serConductor">¿Quieres ser conductor?</h4>
              </li>
              <li className="nav-item" id="numeroItems">
                <button
                  className="navbar brand"
                  id="btnConductor"
                  onClick={() => {
                    navigate("/registrar");
                  }}
                >
                  Si
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Qconductor;
