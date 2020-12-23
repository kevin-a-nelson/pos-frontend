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
        onClick={() => props.history.push("/register-reader")}
      >
        POS
      </div>
    </div>
  );
};

export default SelectScannerOrPOS;
