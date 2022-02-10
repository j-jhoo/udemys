import react from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});
// react 대신에 createContext요청
// 마지막에는 객체를 생성
// createContext는 디폴트 context를 가지고 이 context는 나의 앱이나 컴포넌트 while state이다.

export default AuthContext;
