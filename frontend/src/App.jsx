import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Send } from "./pages/Send";
import { Home } from "./pages/Home";
import { useContext } from "react";
import Context from "./context/AuthProvider";
import RequireAuthState from "./components/RequireAuthState";
function App() {
  const { auth } = useContext(Context);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/signup'
          element={auth?.token ? <Dashboard /> : <Signup />}
        />
        <Route
          path='/signin'
          element={auth?.token ? <Dashboard /> : <Signin />}
        />
        <Route
          path='/'
          element={<Home />}
        />
        <Route element={<RequireAuthState />}>
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
        </Route>
        <Route element={<RequireAuthState />}>
          <Route
            path='/send'
            element={<Send />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
