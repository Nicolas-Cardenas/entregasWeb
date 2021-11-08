import React from "react";
import Cards from "./cards";
import Dpopulares from "./dpopulares";
import FormsScreen from "./formsScreen";
import ImageScreen from "./imageScreen";
import Qconductor from "./qconductor";

function MainScreen() {
  return (
    <div id="main">
      <ImageScreen />
      <FormsScreen />
      <br />
      <Dpopulares />
      <br />
      <Cards />
      <br />
      <Qconductor />
    </div>
  );
}

export default MainScreen;
