import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    // 액션 스트럭쳐를(type) 한번 결정했다면 일관되게 지켜줘야 한다.
    return { value: action.val, isValid: action.val.includes("@") };
    // 앞에 val값을 가져와야하기 때문에 action.val이 되는게 맞다.
  }
  // 액션을 다루는 추가
  // 액션으로 디스패치 한 것은 개체
  // 해당 개체는 우형필드를 가진다. => action.type로 유형 필드에 저장된 값이 USER_INPUT과 맞는지 확인해본다.
  // 두 값(value, isValid)을 모두 업데이트하며, 유저 인풋 액션을 받았을 때 isValid도 업데이트 한다.
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
    // 새로운 스냅샷 반환 -> emailState에 대한 새로운 상태 값
    // value안에 들어갈 값이 이전에 있었던 값이어야 한다. (빈 상태로 리셋 불가능!!)
    // state는 최신 스냅숏 -> 추가 액션
  }
  return { value: "", isValid: false };
  // 이 Reducer에 닿을 수 있는 다른 행동에 대해서는 { value: "", isValid: false } 이 상태가 반환된다.
};
// useReducer의 첫번째 인수인 함수를 상수에 저장해서 사용할 수 있음
// Reducer함수를 컴포넌트 함수 밖에서 만든것에 주목 (
// - 밖에서 만든 Reducer함수 안에서는 컴포넌트 함수 안에서 만들어진 데이터는 필요하지 않다.
// - 그래서 Reducer함수는 컴포넌트 밖에서 만들어져야한다.
// - 컴포넌트 함수 내부의 것들과 상호작용할 필요가 없어진다.
// - Reducer안에서 활용될 모든 데이터는 이 함수로 전달된다. => 리엑트에 의해서 자동으로 실행된다.
// )
// 2개의 인수와 2개의 파라미터를 갖는다.

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    vlaue: "",
    isValid: false,
    // emailState에 대한 스냅숏의 설정 초기 상태
  });
  // useReducer -> 첫번째 인수는 함수!!

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  // 에일리어스 할당 => 값을 할당하는것이 아니라 에일리어스를 할당하는 것
  // 등호 왼편에서 꺽인 괄호를 사용할때 자동으로 사용하는 문법인 디스트럭쳐링 문법의 일부
  // effect의 dependency로 props를 가질 수 있다.

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  // emailIsValid와 passwordISValid를 끌어내려서 사용할 경우 비밀번호를 계속 입력하더라도 유효성검사를 계속하지 않는다.

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // 대게로 객체를 많이 사용함
    // 유저가 입력한 값을 저장하는 것
    //   setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
    // };
    //  쪼개져있는 state는 좋지 않음

    const passwordChangeHandler = (event) => {
      dispatchPassword({ type: "USER_INPUT", val: event.target.value });

      setFormIsValid(
        emailState.isValid && event.target.value.trim().length > 6
      );
    };

    const validateEmailHandler = () => {
      dispatchEmail({ type: "INPUT_BLUR" });
      // 유형 필드를 통해 객체를 디스패치 해야한다. 인풋이 포커스를 잃어서 흐려졌다.
    };

    const validatePasswordHandler = () => {
      dispatchEmail({ type: "INPUT_BLUR" });
    };

    const submitHandler = (event) => {
      event.preventDefault();
      props.onLogin(emailState.value, passwordState.value);
    };

    return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailState.isValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              passwordState.isValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    );
  };
};

export default Login;
