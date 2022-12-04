import React from "react";
import "./CSS/navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logInUser } from "../../api";

const Navbar = ({ navGreeting, setNavGreeting }) => {
  //------Global constants------
  const navigate = useNavigate();
  const userName = localStorage.getItem("first_name");
  const token = localStorage.getItem("token");

  //------Log out function------
  function onClickLogOut(event) {
    event.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    setNavGreeting("");
    navigate("/");
  }

  //------Guest sign-in function------
  async function onClickGuestSignIn() {
    let guest = await logInUser("guestuser", "guestuser");
    localStorage.removeItem("first_name");
    localStorage.removeItem("token");
    localStorage.setItem("first_name", guest.user.first_name);
    localStorage.setItem("token", guest.token);
    setNavGreeting(guest.message);
    navigate("/");
  }

  return (
    <>
      {/* ------------------ LOGO BUTTON ------------------ */}
      <div id="navbar">
        <Link to={"/"} className="logoLink">
          <img
            src="https://i.imgur.com/pW8C9X6.png"
            alt="GuitarStop"
            className="logo"
          />
        </Link>

        {/* ------------------ MY ACCOUNT BUTTON ------------------ */}
        <div className="navButtonGroup">
          <div>
            <h3 className="navGreeting">{navGreeting}</h3>
          </div>
          <div>
            {token && userName !== "Guest" ? (
              <div>
                <Link to={"/account"}>
                  <button className="navButton">My Account</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* ------------------ ADMIN DASHBOARD BUTTON ------------------ */}
          <div>
            {userName === "admin" ? (
              <div>
                <Link to={"/admin"}>
                  <button className="navButton">Admin Dashboard</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* ------------------ PRODUCTS BUTTON ------------------ */}
          <Link to={"/products"}>
            <button className="navButton">Products</button>
          </Link>

          {/* ------------------ CART BUTTON ------------------ */}
          <div>
            {token ? (
              <div>
                {" "}
                <Link to={"/cart"}>
                  <button className="navButton">Cart</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* ------------------ LOGIN, REGISTER, LOGOUT BUTTON ------------------ */}
          <div>
            {!token || (token && userName === "Guest") ? (
              <div>
                <Link to={"/login"}>
                  <button className="navButton">Login</button>
                </Link>
                <Link to={"/register"}>
                  <button className="navButton">Register</button>
                </Link>
              </div>
            ) : (
              <div>
                <button onClick={onClickLogOut} className="navButton">
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* ------------------ SIGN IN AS GUEST BUTTON ------------------ */}
          <div>
            <div>
              {(token && userName !== "Guest") || userName === "Guest" ? (
                <></>
              ) : (
                <div>
                  <button className="navButton" onClick={onClickGuestSignIn}>
                    Sign In As Guest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
