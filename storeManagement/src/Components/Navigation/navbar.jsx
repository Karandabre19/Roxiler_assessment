    import PropTypes from "prop-types";
    import React from "react";
    import NavbarModuleCss from "./Navbar.module.scss";

    const Navbar = ({ children }) => {

    return (
        <div className={NavbarModuleCss.navbarContainer}>
        <nav>
            <div className={NavbarModuleCss.logo} >
            ReviewHub
            </div>
            {children}
        </nav>
        </div>
    );
    };

    Navbar.propTypes = {
    children: PropTypes.node,
    };

    export default Navbar;
