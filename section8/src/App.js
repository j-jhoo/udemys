import React from "react";
import AddUser from "../public/components/Users/AddUser";
import UserList from "../public/components/Users/UserList";

function App() {
  return (
    <div>
      <AddUser />
      <UserList users={[]} />
    </div>
  );
}

export default App;
