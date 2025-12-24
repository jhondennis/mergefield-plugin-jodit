import React from "react";

interface PayloadComparisonProps {
  lastSent: string | null;
  rawSent: string | null;
}

export const PayloadComparison: React.FC<PayloadComparisonProps> = ({
  lastSent,
  rawSent,
}) => {
  if (!lastSent) return null;

  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
        borderColor: "#4ade80",
        textAlign: "left",
      }}
    >
      <h3>🚀 Comparativa de Envío</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, maxWidth: "100%" }}>
          <h4 style={{ color: "red" }}>❌ Sin Middleware (Raw HTML)</h4>
          <p style={{ fontSize: "0.8em" }}>
            Esto envía el HTML sucio del editor con spans, clases y atributos
            internos.
          </p>
          <pre
            style={{
              background: "#fee2e2",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
              fontSize: "1em",
              border: "1px solid #ef4444",
            }}
          >
            {rawSent}
          </pre>
        </div>

        <div style={{ flex: 1, maxWidth: "100%" }}>
          <h4 style={{ color: "green" }}>✅ Con Middleware (Procesado)</h4>
          <p style={{ fontSize: "0.8em" }}>
            Usando <code>extractPlaceholders()</code>, enviamos solo los datos
            limpios.
          </p>
          <pre
            style={{
              background: "#dcfce7",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
              fontSize: "1em",
              border: "1px solid #22c55e",
            }}
          >
            {lastSent}
          </pre>
        </div>
      </div>
    </div>
  );
};
