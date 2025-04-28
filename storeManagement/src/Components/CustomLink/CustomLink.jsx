import React from "react";
import { Link } from "react-router-dom";
import linkModuleCss from "./customlink.module.scss";

const CustomLink = ({ children, to, className }) => {
    return (
        <Link className={`${linkModuleCss.customLink} ${className}`} to={to}>
        {children}
        </Link>
    );
};

export default CustomLink;
