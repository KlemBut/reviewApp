import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Single from "./pages/Single";
import { useEffect, useState } from "react";


function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [logCounter, setCounter] = useState(0);
  useEffect(() => {
    update();
  }, []);

  function logout() {
    const user = {
      user: null,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    };
    fetch("http://localhost:4001/logout", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        update();
      });
  }

  async function update() {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    };
    let response = await fetch("http://localhost:4001/loggedin", options)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.message);
      });
  }
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          {currentUser ? (
            <div>
              <ul>
                <li><h3>Loggedin as: <i>{currentUser}</i></h3></li>
                <li><Link to="/"><h3 className="logout" onClick={logout}>Logout</h3></Link></li>
                <li><Link to="/main"><h3>Main</h3></Link></li>
              </ul>
            </div>
          ) : (
            <div>
              <ul>
                <li><Link to="/register"><h3>Register</h3></Link></li>
                <li><Link to="/"><h3>Login</h3></Link></li>
              </ul>
            </div>
          )}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                logCounter={logCounter}
                setCounter={setCounter}
                update={update}
              ></Login>
            }
          ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/main" element={<Main></Main>}></Route>
          <Route
            path="/single/:id"
            element={<Single currentUser={currentUser}></Single>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
