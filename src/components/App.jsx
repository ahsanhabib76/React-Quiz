import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/quiz/:id" element={<Quiz />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/result/:id" element={<Result />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
