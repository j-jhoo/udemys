import React from "react";
import "./Card.module.css";

const Card = (props) => {
  return <div>{props.Children}</div>;
};

export default Card;
