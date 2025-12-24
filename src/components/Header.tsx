import React from "react";

export const Header: React.FC = () => {
  return (
    <>
      <h1 className="header-title">Editor Jodit + Merge Fields</h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "30px",
          marginTop: "-10px",
        }}
      >
        Gestión manual de variables con simulación de API
      </p>

      <div className="header-buttons">
        <a
          href="https://github.com/jhondennis/mergefield-plugin-jodit"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
        >
          <button className="btn-custom btn-github">
            <span style={{ fontSize: "1.2em" }}>GitHub</span>
          </button>
        </a>
        <a
          href="https://mergefield-plugin-jodit.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
        >
          <button className="btn-custom btn-demo">
            <span style={{ fontSize: "1.2em" }}>Live Demo</span>
          </button>
        </a>
      </div>
    </>
  );
};
