import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
