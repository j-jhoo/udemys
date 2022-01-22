import React, { useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  // isLoggedIn 상태를 관리하는 파일

  // const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  // if (storedUserLoggedInInformation === "1") {
  //   setIsLoggedIn("true");
  // }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 현재 상태에서 새로 고침시에 인증 상태가 사라지는 이유는 -> 그냥 (state)리액트 상태로 관리되고 있기 때문이다.
  // 리액트에서 자바스크립트 변수의 일종으로 관리된다. -> 이러한 경우에 리액트 스크립트가 다시 시작하게 되며 이전 실행에서의 모든 변수는 사라지게 된다. (웹, 스크립트, 브라우저의 작동원리. 리액트 문제 아님 )
  // 그래서 리로딩의 영향을 받지 않는 곳에 저장해두면 좋겠다. -> 앱이 시작할 때 데이터가 유지됐는지 확인도 가능. (만약 유지됐다면 유저를 자동으로 로그인시켜 정보를 재차 입력할 필요가 없게 만들 수 있다.)
  // useEffect()활용 가능 

    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true); // 브라우저 스토리지의 이 위치에 정보를 저장
  };

  const logoutHandler = () => {
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
