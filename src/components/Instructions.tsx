import React from "react";

export const Instructions: React.FC = () => {
  return (
    <div className="instructions">
      <h4>Cómo funciona:</h4>
      <ul>
        <li>
          <strong>renderMergeFields(string)</strong>: Convierte{" "}
          <code>{"{{variable}}"}</code> en chips visuales. Se usa al cargar
          datos.
        </li>
        <li>
          <strong>extractPlaceholders(html)</strong>: Convierte chips visuales
          de vuelta a <code>{"{{variable}}"}</code>. Se usa antes de enviar
          datos.
        </li>
      </ul>
    </div>
  );
};
