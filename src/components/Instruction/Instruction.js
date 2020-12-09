import React from "react";
import Button from "react-bootstrap/Button";

import "./Instruction.scss";

const Instruction = (props) => {
  const { className, header, img, btns, lines } = props;

  const Lines = () => {
    if (!lines || lines.length === 0) {
      return null;
    }

    return lines.map((line, index) => {
      return (
        <p key={index} className={`line${index + 1}`}>
          {line.text}
        </p>
      );
    });
  };

  const Buttons = () => {
    if (!btns || btns.length === 0) {
      return null;
    }

    return btns.map((btn, index) => {
      return (
        <Button
          key={index}
          variant={btn.variant}
          className={`btn${index + 1}`}
          onClick={() => btn.onClick()}
          block={btn.block}
          size={btn.size || "lg"}
        >
          {btn.text}
        </Button>
      );
    });
  };

  return (
    <div className={`generic ${className}`}>
      <div className="header-container">
        <h1>{header}</h1>
      </div>
      <div className="img-container">
        <img src={img} alt="img" />
      </div>
      <Lines />
      <div className="btn-container">
        <Buttons />
      </div>
    </div>
  );
};

export default Instruction;
