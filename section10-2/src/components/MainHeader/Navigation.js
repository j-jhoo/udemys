import React, {useContext} from "react";

import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  useContext();
  
  return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                // ctx로 접근하여서 isLoggedIn을 prop한다.
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
      {/* consumer은 자식으로 함수가 있어야 하는데 전달인자로는 context데이터를 취한다.
          jsx코드는 자식인 함수 안으로 들어가야한다.   */}
  );
};

export default Navigation;
