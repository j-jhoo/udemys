import react from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});
// react 대신에 createContext요청
// 마지막에는 객체를 생성
// createContext는 디폴트 context를 가지고 이 context는 나의 앱이나 컴포넌트 while state이다.

export default AuthContext;

// * 공급은 항상 첫 번째 단계
// * 공급은 jsx코드에서 wrap하는 것을 뜻하다.
// * 모든 컴포넌트 내에서 context를 들을 수 있어야 한다.
// * !! wrap되지 않은 컴포넌트는 들을 수 없다.
