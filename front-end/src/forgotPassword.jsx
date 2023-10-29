import React from "react";
import "./forgotPassword.css";

const ForgotPassword = () => {
  return (
    <div className="FORGOT-PASSWORD">
      <div className="div">
        <div className="reset-password">
          <div className="overlap-group">
            <div className="text-wrapper">Reset Password</div>
          </div>
        </div>
        <div className="EMAIL">
          <div className="overlap">
            <div className="text-wrapper-2">[EMAIL]</div>
          </div>
        </div>
        <p className="p">Enter account email to reset password</p>
        <div className="app-logo" />
        <button className="back-button">
          <div className="div-wrapper">
            <div className="text-wrapper-3">Back</div>
          </div>
        </button>
      </div>
    </div>
  );
};
export default ForgotPassword;