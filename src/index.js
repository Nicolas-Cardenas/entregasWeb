import React from "react";
import ReactDOM from "react-dom";
//import Perfil from "./components/perfil.js";
import Registrar from "./components/registrarConductor";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Perfil from "./components/perfil";
import CrearViaje from "./components/crearViaje";
import RegistrarVehiculo from "./components/registrarVehiculo";
import Screen from "./components/mainScreen/screen";
import ModificarVehiculo from "./components/modificarVehiculo";
import BuscarViajes from "./components/buscarViajes";
import Footer from "./components/footer";
import HeaderScreen from "./components/mainScreen/headerScreen";
import VerViajesConductor from "./components/verViajesConductor";
import DetalleViaje from "./components/detalleViaje";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <HeaderScreen />
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/crearViaje" element={<CrearViaje />} />
        <Route path="/registrarVehiculo" element={<RegistrarVehiculo />} />
        <Route path="/modificarVehiculo" element={<ModificarVehiculo />} />
        <Route path="/buscarViajes" element={<BuscarViajes />} />
        <Route path="/verViajes" element={<VerViajesConductor />} />
        <Route path="/detalleViaje" element={<DetalleViaje />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </div>,
  document.getElementById("root"),
);
