import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Perfil(props) {
  const [perfil, setPerfil] = useState({});
  const [vehiculo, setVehiculo] = useState({});
  let navigate = useNavigate();
  const { state } = useLocation();
  let Token = "";
  useEffect(() => {
    let url_pasajeros = "https://carpoolingwebg1.herokuapp.com/api/pasajeros";
    let url_conductor = "https://carpoolingwebg1.herokuapp.com/api/conductores";
    let url_vehiculo = "https://carpoolingwebg1.herokuapp.com/api/vehiculos";

    // const urlParams = new URLSearchParams(window.location.search);
    // const correo = urlParams.get("correo");
    // const contrasena = urlParams.get("contrasena");
    //const correo = "pepito@pasajero.com";
    const correo = state.correo;
    const contrasena = state.contrasena;

    url_pasajeros += "?correo=" + correo + "&contrasena=" + contrasena;
    url_conductor += "?correo=" + correo + "&contrasena=" + contrasena;

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
      .then((token) => {
        Token = token;
        let myHeaders2 = new Headers();
        myHeaders2.append("Authorization", "Bearer " + token);
        myHeaders2.append("Content-Type", "application/json");
        fetch(url_pasajeros, {
          method: "GET",
          headers: myHeaders2,
        })
          .then((response) => response.json())
          .then((data) => {
            setPerfil(data);
            setVehiculo({});
          })
          .catch(() => {
            fetch(url_conductor, {
              headers: myHeaders2,
            })
              .then((response) => response.json())
              .then((data) => {
                setPerfil(data);
                fetch(url_vehiculo + "/" + state.VehiculoId, {
                  headers: myHeaders2,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setVehiculo({ data });
                  });
              });
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function esConductor() {
    if (Object.keys(vehiculo).length !== 0) {
      return (
        <div>
          <div className="row">
            <div className="col" id="perfilImagen">
              <img src={vehiculo.data.foto} id="imagenVehiculo" alt="" />
            </div>
            <div className="col-7" id="perfiles">
              <div className="row">
                <div className="col">
                  <h2>Placa: {vehiculo.data.placa}</h2>
                </div>
                <div className="col">
                  <h2>Tipo: {vehiculo.data.tipo}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h2>Modelo: {vehiculo.data.modelo}</h2>
                </div>
              </div>
              <div className="row" id="botonModificarVehiculo">
                <div className="col">
                  <button
                    type="submit"
                    className="btn-primary btn-block btn-lg"
                    onClick={() => {
                      navigate("/modificarVehiculo", {
                        state: {
                          VehiculoId: state.VehiculoId,
                          ConductorId: state.ConductorId,
                        },
                      });
                    }}
                  >
                    Modificar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary btn-block btn-lg"
                  onClick={() => {
                    navigate("/crearViaje", {
                      state: { profile: perfil, modelo: vehiculo.data.modelo },
                    });
                  }}
                >
                  Crear Viaje
                </button>
              </div>
            </div>
            <div className="col">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary btn-block btn-lg"
                  onClick={() => {
                    navigate("/verViajes", {
                      state: { token: Token },
                    });
                  }}
                >
                  Ver Viajes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col" id="perfilImagen">
          <img src={perfil.foto} id="imagenPerfil" alt="" />
        </div>
        <div className="col-7" id="perfiles">
          <div className="row">
            <div className="col">
              <h2>{perfil.nombre}</h2>
            </div>
            <div className="col">
              <h2>{perfil.edad} años</h2>
            </div>
          </div>
          <div className="row">
            <div className="col" id="mailPerfil">
              <h2>{perfil.correo}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2>Cel: {perfil.celular}</h2>
            </div>
          </div>
        </div>
      </div>
      {esConductor()}
    </div>
  );
}

export default Perfil;
