import { useState } from "react";
import "./App.css";
import {
  renderMergeFields,
  extractPlaceholders,
} from "./editor/merge-fields-plugin";

import {
  Header,
  DatabaseSimulator,
  VisualEditor,
  PayloadComparison,
  Instructions,
} from "./components";

function App() {
  // Simula el contenido guardado en base de datos (texto plano con placeholders)
  const [dbContent, setDbContent] = useState<string>(
    "Hola <strong>{{name}}</strong>, bienvenido a <strong>{{company}}</strong>. Este es un ejemplo de contenido con variables.",
  );

  // Estado del contenido visual en el editor
  const [editorContent, setEditorContent] = useState<string>("");

  // Estado para mostrar lo último enviado a la API
  const [lastSent, setLastSent] = useState<string | null>(null);
  const [rawSent, setRawSent] = useState<string | null>(null);

  /**
   * Simula recibir datos de una API.
   * Transforma el texto plano (guardado en DB) a HTML visual para el editor.
   */
  const handleLoadFromAPI = () => {
    const visualContent = renderMergeFields(dbContent);
    setEditorContent(visualContent);
  };

  /**
   * Simula enviar datos a una API.
   * Transforma el HTML visual del editor a texto plano para guardar en DB.
   */
  const handleSaveToAPI = () => {
    // 1. Sin Middleware (Lo que tiene el editor internamente)
    setRawSent(editorContent);

    // 2. Con Middleware (Lo que queremos enviar)
    const plainText = extractPlaceholders(editorContent);
    setDbContent(plainText);
    setLastSent(plainText);

    console.log("Guardando en API:", plainText);
  };

  return (
    <>
      <Header />

      <DatabaseSimulator
        content={dbContent}
        setContent={setDbContent}
        onLoad={handleLoadFromAPI}
      />

      <VisualEditor
        content={editorContent}
        setContent={setEditorContent}
        onSave={handleSaveToAPI}
      />

      <PayloadComparison lastSent={lastSent} rawSent={rawSent} />

      <Instructions />
    </>
  );
}

export default App;
