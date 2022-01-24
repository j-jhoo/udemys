import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  // isLoggedIn 상태를 관리하는 파일

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 현재 상태에서 새로 고침시에 인증 상태가 사라지는 이유는 -> 그냥 (state)리액트 상태로 관리되고 있기 때문이다.
  // 리액트에서 자바스크립트 변수의 일종으로 관리된다. -> 이러한 경우에 리액트 스크립트가 다시 시작하게 되며 이전 실행에서의 모든 변수는 사라지게 된다. (웹, 스크립트, 브라우저의 작동원리. 리액트 문제 아님 )
  // 그래서 리로딩의 영향을 받지 않는 곳에 저장해두면 좋겠다. -> 앱이 시작할 때 데이터가 유지됐는지 확인도 가능. (만약 유지됐다면 유저를 자동으로 로그인시켜 정보를 재차 입력할 필요가 없게 만들 수 있다.)
  // useEffect()활용 가능

  // const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  // // 로컬스토리지에서 getItem을 호출하고 isLoggedIn을 검색하면 저장된 아이템들이 반환됨.

  // if (storedUserLoggedInInformation === "1") {
  //   setIsLoggedIn("true");
  //   // 1이 맞다면 setIsLoggedIn을 호출해서 이를 true로 설정한다. -> 유저가 로그인으로 설정된다.
  //   // useState가 실행된 이후에 실행 (하지만 이러할 경우 무한루프를 만들 수 있다. )
  // // } -> useEffect(안으로 들어가게됨)

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn("false");
    }
  }, []);
  // 두개의 인수를 전달. (첫번째 인수는 화살표 함수 이용, 두번째 인수는 디펜던시)
  // 컴포넌트 함수에서 직접적으로 실행하면 안되는 코드 -> 리엑트에 의해서 실행, 모든 컴포넌트 재평가 이후에 실행!!

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    // (아이템에 적당한 식별자를 부여함. 단 '문자열', 두번째 인수 또한 저장하는 정보에 대한 '문자열') -> 1은 로그인되었다는 시그널! 0은 그 반대를 뚯하는 시그널!
    setIsLoggedIn(true); // 브라우저 스토리지의 이 위치에 정보를 저장 -> 브라우저에서 가장 보편적으로 사용하는 쿠키, 로컬 스토리지
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    // 로그아웃버튼을 눌렀을때 로컬스토리지의 isLoggedIn키가 지워지게 된다.
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}
export default App;
