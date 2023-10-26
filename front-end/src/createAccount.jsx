import React from "react";
import "./createAccount.css";

const CreateAccount = () => {
  return (
    <div className="CREATE-ACCOUNT">
      <div className="div">
        <div className="create-account">
          <div className="overlap-group">
            <div className="text-wrapper">Create Account</div>
          </div>
        </div>
        <div className="RE-ENTER-PASSWORD">
          <div className="overlap">
            <div className="text-wrapper-2">[RE-ENTER PASSWORD]</div>
          </div>
        </div>
        <div className="PASSWORD">
          <div className="overlap">
            <div className="text-wrapper-3">[PASSWORD]</div>
          </div>
        </div>
        <div className="EMAIL">
          <div className="overlap">
            <div className="text-wrapper-4">[EMAIL]</div>
          </div>
        </div>
        <div className="NAME">
          <div className="overlap">
            <div className="text-wrapper-5">[NAME]</div>
          </div>
        </div>
        <div className="app-logo" />
        <button className="back-button">
          <div className="div-wrapper">
            <div className="text-wrapper-6">Back</div>
          </div>
        </button>
      </div>
    </div>
  );
};
export default CreateAccount;