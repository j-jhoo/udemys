import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("Effect Running:::");

    return () => {
      console.log("lalablaalal");
    };
  });

  // setTimeout,clearTimeout  => 브라우저 빌트인 메서드
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Validity::::!!!");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   // 클린업 함수 (익명의 함수 리턴) return () => {}
  //   // - useEffect 함수가 작동할 때마다, 작동하기 전에, 돌아가는 아주 첫 번째를 제외하고는 클린업 함수가 돌아간다.
  //   // - 클린업함수 작동 -> 돔에서부터 특정한 컴포넌트가 작동할때마다, 컴포넌트가 다시 사용될 때마다
  //   // - 모든 새로운 사이드 이펙트 함수가 실행되고 컴포넌트가 제거되기 전에 실행된다.
  //   // :: 클린업 함수는 사이드 이펙트 함수가 실행되기 전에는 작동하지 않는다. 그다음 모든 사이드 이펙트 함수가 실행되기 전에 작동된다.
  //   return () => {
  //     console.log("Cleanup::::!!!");
  //     clearTimeout(identifier);
  //     // 클린업 함수가 돌아갈때마다 클린업 함수가 돌아가기 전에 설정된 setTimeout타이머를 클리어할 수 있다.
  //     // 마지막 사이드 이펙트 함수가 실행되면 다음 사이드 이펙트 함수가 실행될때 타이머를 새로 정할 수 있다.
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredEmail.includes("@") && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
