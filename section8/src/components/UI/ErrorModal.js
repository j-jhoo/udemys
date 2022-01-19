import React from "react";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.errorModal} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.messeage}</p>
        </div>
        <footer className={classes.actions}>
          <button onClick={props.errorModal}>lalalalal</button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
