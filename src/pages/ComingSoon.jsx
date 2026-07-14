import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTools, FaArrowLeft } from "react-icons/fa";
import "./ComingSoon.css";

/**
 * Placeholder used for every route besides Home while the rest of the
 * site is being built out page by page.
 */
const ComingSoon = () => {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "").split("?")[0] || "This page";

  return (
    <div className="d_coming_soon d_container_fluid d_section">
      <FaTools className="d_coming_soon_icon" />
      <h1 className="d_section_title">
        {pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, " ")} — Coming Soon
      </h1>
      <p className="d_section_subtitle">
        We're still building this page. Check back soon!
      </p>
      <Link to="/" className="d_btn_primary">
        <FaArrowLeft size={12} /> Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
