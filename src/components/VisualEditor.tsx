import React from "react";
import { EditorPlugin } from "../editor";

interface VisualEditorProps {
  content: string;
  setContent: (value: string) => void;
  onSave: () => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  content,
  setContent,
  onSave,
}) => {
  return (
    <div className="card">
      <h3>2. Editor Visual</h3>
      <p>Aquí se edita el contenido con chips visuales.</p>
      <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "10px" }}>
        💡 Tip: Escribe <code>{"{{"}</code> o usa el botón{" "}
        <strong>{"{•}"}</strong> para insertar variables.
      </p>
      <EditorPlugin
        initialValue={content}
        onChange={setContent}
        // key ayuda a forzar re-render si cambia el contenido inicial drásticamente
        key={content ? "loaded" : "empty"}
      />
      <br />
      <button onClick={onSave}>⬆️ Guardar en API (extractPlaceholders)</button>
    </div>
  );
};
