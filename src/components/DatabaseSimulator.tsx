import React from "react";

interface DatabaseSimulatorProps {
  content: string;
  setContent: (value: string) => void;
  onLoad: () => void;
}

export const DatabaseSimulator: React.FC<DatabaseSimulatorProps> = ({
  content,
  setContent,
  onLoad,
}) => {
  return (
    <div className="card">
      <h3>1. Simulación de recuperación de Base de Datos / API</h3>
      <p>Este es el contenido crudo como se guardaría en el backend:</p>
      <textarea
        style={{ width: "100%", height: "80px", marginBottom: "10px" }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={onLoad}>⬇️ Cargar en Editor (renderMergeFields)</button>
    </div>
  );
};
