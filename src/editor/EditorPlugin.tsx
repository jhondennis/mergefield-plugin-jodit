import "./merge-fields.css";

import { useMemo, useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";

import { eventKeyDownPlugin, MERGE_FIELD_KEY } from "./merge-fields-plugin";

interface EditorPluginProps {
  onChange?: (content: string) => void;
  initialValue?: string;
  placeholder?: string;
  readonly?: boolean;
}

Jodit.plugins.add(MERGE_FIELD_KEY, eventKeyDownPlugin);

export const EditorPlugin = ({
  onChange,
  initialValue = "",
  placeholder,
  readonly = false,
}: EditorPluginProps) => {
  const editor = useRef<any>(null);

  const config = useMemo(() => {
    const buttons = [...Jodit.defaultOptions.buttons, MERGE_FIELD_KEY];

    return {
      readonly: readonly,
      placeholder: placeholder || "Escribe aquí...",
      theme: "light",
      language: "es",
      buttons,
    };
  }, [placeholder, readonly]);

  const handleOnChange = (content: string) => {
    onChange?.(content);
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={initialValue}
        onBlur={handleOnChange}
        config={config}
      />
    </>
  );
};
