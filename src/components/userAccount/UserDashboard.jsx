import React from "react";
import { Link } from "react-router-dom";
import { UserDelete, UserEdit } from "../";
import "./CSS/userAccount.css";

const UserDashboard = ({
  token,
  userAccount,
  setUserAccount,
  setNavGreeting,
}) => {
  return (
    <>
      <div className="myAccountDiv">
        <div className="myAccount">
          <div className="accountInfo">
            <div className="accountInfoHeader">Account Information:</div>
            <div>{`First Name: ${userAccount.first_name}`}</div>
            <div>{`Last Name: ${userAccount.last_name}`}</div>
            <div>{`Email: ${userAccount.email}`}</div>
          </div>
        </div>

        <div>
          <Link to={"/cart"}>
            <button className="yourCartButton">Your Cart</button>
          </Link>
        </div>

        <div>
          {userAccount.email === "admin" ? (
            <></>
          ) : (
            <div>
              <UserEdit
                token={token}
                userAccount={userAccount}
                setUserAccount={setUserAccount}
                setNavGreeting={setNavGreeting}
              />
              <UserDelete
                userAccount={userAccount}
                setNavGreeting={setNavGreeting}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
