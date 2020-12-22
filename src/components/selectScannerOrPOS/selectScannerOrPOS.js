import React from "react";
import Button from "react-bootstrap/Button";

import "./selectScannerOrPOS.css"

const SelectScannerOrPOS = (props) => {
  return (
    <div class="select-scanner-or-pos">
      <div
        class="selectBtn"
        onClick={() => props.history.push("/scanner")}
      >
        Scanner
      </div>
      <div
        class="selectBtn"
        onClick={() => props.history.push("/checkout")}
      >
        POS
      </div>
      <p class="back">
        Back
      </p>
    </div>
  );
};

export default SelectScannerOrPOS;
