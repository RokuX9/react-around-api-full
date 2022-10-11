import React from "react";
import "../blocks/Header.css";
import "../blocks/Navbar.css";
import Button from "./Button";
import Navbar from "./Navbar";

function Header({ loggedIn, ...props }) {
  const [navbarOpened, setNavbarOpened] = React.useState(false);
  const handleLogOut = () => {
    setNavbarOpened(false);
    props.handleLogOut();
  };
  return (
    <header className={"header" + (navbarOpened ? " header_extended" : "")}>
      <div className="header__logo"></div>
      {loggedIn && (
        <Button
          className="header__nav-button"
          onClick={() => {
            setNavbarOpened(!navbarOpened);
          }}
        ></Button>
      )}
      <Navbar
        className={"navbar" + (navbarOpened ? " navbar_opened" : "")}
        loggedIn={loggedIn}
        history={props.history}
        userEmail={props.userEmail}
        handleLogOut={handleLogOut}
      />
    </header>
  );
}

export default Header;
