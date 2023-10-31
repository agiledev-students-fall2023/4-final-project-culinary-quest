import React from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
import { FaArrowLeft } from "react-icons/fa";

const CreateAccount = () => {
  return (
    <div className="CreateAccountPage">
      <div className="CreateAccountContainer">
        <div className="CreateName">
          <input type="text" placeholder="Name" />
        </div>
        <div className="CreateEmail">
          <input type="text" placeholder="Email" />
        </div>
        <div className="CreatePassword">
          <input type="password" placeholder="Password" />
        </div>
        <div className="Re-enterPassword">
          <input type="password" placeholder="Re-enter Password" />
        </div>
        <span className="PasswordRequirement">
            <em>
            - Must be at least 8 characters long.<br />
            - Must contain at least one number. <br />
            - Must contain at least one special character. <br />
            - Must contain at least one uppercase letter.
            </em>
          </span>
        <div className="CreateButton">
          <Link to="/login" className="Create">
            Create Account
          </Link>
        </div>
        {/* <div className="BackButton">
          <Link to="/login" className="Back">
            <FaArrowLeft />
          </Link>
        </div> */}
        <div className="AppLogo" />
      </div>
    </div>
  );
};

export default CreateAccount;
