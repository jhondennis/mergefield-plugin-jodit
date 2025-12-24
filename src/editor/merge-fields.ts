import { Jodit } from "jodit-react";
import { IJodit } from "jodit/esm/types";

import MERGE_FIELDS from "./merge-fields.json";

const createSpan = (id: string, label: string, editor: IJodit) => {
  const span = editor.create.element("span");
  span.className = "merge-field";
  span.dataset.id = id;
  span.contentEditable = "false";

  const open = editor.create.element("span");
  open.className = "brackets";
  open.textContent = "{{";

  const text = editor.create.element("span");
  text.textContent = label;

  const close = editor.create.element("span");
  close.className = "brackets";
  close.textContent = "}}";

  span.append(open, text, close);

  span.addEventListener("mousedown", () => {
    span.contentEditable = "true";
  });

  span.addEventListener("blur", () => {
    span.contentEditable = "false";
  });

  return span;
};

Jodit.defaultOptions.controls.insertMergeFields = {
  name: "{{◦}}",
  tooltip: "Insert Merge Field",
  popup: (editor: any, _current, close: () => void) => {
    const popup = document.createElement("ul");

    MERGE_FIELDS.forEach(({ label, id }) => {
      const option = document.createElement("li");
      option.textContent = label;
      option.className = "merge-field-option";

      option.onclick = () => {
        editor.s.insertHTML(createSpan(id, label, editor));
        close();
      };
      popup.appendChild(option);
    });

    return popup;
  },
};

export class insertMergeFieldsPlugin {
  buttons = [
    {
      name: "insertMergeFields",
      group: "insert",
    },
  ];
}
