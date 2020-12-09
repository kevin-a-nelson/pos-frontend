import React from "react";
import Button from "react-bootstrap/Button";

const SelectScannerOrPOS = (props) => {
  return (
    <div>
      <Button onClick={() => props.history.push("/scanner")}>Scanner</Button>
      <Button onClick={() => props.history.push("/checkout")}>POS</Button>
    </div>
  );
};

export default SelectScannerOrPOS;
