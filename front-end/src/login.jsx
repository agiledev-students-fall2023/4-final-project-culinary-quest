import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email: email,
        password: password,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="InputEmail">
          <input type="text" placeholder="Email"/>
        </div>
        <div className="InputPassword">
          <input type="password" placeholder="Password"/>
        </div>
        <Link to="/forgot-password" className="ForgotPasswordLink">
          Forgot Password?
        </Link>
        <div className="LoginButton">
        <button onClick={handleLogin} className="Login">
          Log In
        </button>
      </div>
        <div className="SignUpLink">
          <span className="CreateMessage">
            Don’t have an account? {" "}
          </span>
          <Link to="/create-account" className="SignUpText">
            Sign Up
          </Link>
        </div>
        <div className="AppLogo" />
      </div>
    </div>
  );
};

export default Login;
