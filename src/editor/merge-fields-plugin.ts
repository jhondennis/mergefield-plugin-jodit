import { Jodit } from "jodit-react";
import { IJodit } from "jodit/esm/types";

import MERGE_FIELDS from "./merge-fields.json";

export const MERGE_FIELD_KEY = "mergeField";

/**
 * Reemplaza los marcadores de posición {{id}} en el HTML por elementos visuales
 * interactivos (spans) para su edición en el editor Jodit.
 */
export function renderMergeFields(html: string): string {
  let result = html;
  MERGE_FIELDS.forEach(({ id, label }) => {
    const regex = new RegExp(`{{${id}}}`, "g");
    result = result.replace(regex, () => {
      return (
        `<span class="merge-field" data-id="${id}" contenteditable="false">` +
        `<span class="brackets">{{</span>` +
        `${label}` +
        `<span class="brackets">}}</span>` +
        `</span>`
      );
    });
  });
  return result;
}

/**
 * Convierte los elementos visuales de los campos de combinación (HTML)
 * de vuelta a su formato de texto original {{id}}.
 * Útil para guardar el contenido en la base de datos o procesarlo.
 */
export function extractPlaceholders(html: string): string {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  const mergeFields = temp.querySelectorAll<HTMLElement>(".merge-field");

  mergeFields.forEach(span => {
    const id = span.dataset.id;
    if (id) {
      span.replaceWith(`{{${id}}}`);
    }
  });

  return temp.innerHTML;
}

/**
 * Crea un elemento DOM visual para un campo de combinación, incluyendo
 * los corchetes y el comportamiento de edición.
 */
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

/**
 * Plugin de Jodit que maneja la inserción de campos de combinación mediante
 * atajos de teclado ({{) y añade un botón a la barra de herramientas.
 */
export class eventKeyDownPlugin {
  buttons = [
    {
      name: MERGE_FIELD_KEY,
      group: "insert",
    },
  ];
  /**
   * Inicializa el plugin, configurando el botón de la barra de herramientas
   * y los listeners de eventos para el autocompletado.
   */
  init(jodit: IJodit) {
    const openDialog = () => {
      const dialog = new Jodit.modules.Dialog({
        language: jodit.o.language,
      });
      dialog.setHeader("Insertar Campo");

      const container = document.createElement("ul");
      container.className = "merge-field-list";

      MERGE_FIELDS.forEach(({ id, label }, index) => {
        const item = document.createElement("li");
        item.textContent = label;
        item.className = "merge-field-option";
        item.tabIndex = index;

        item.onclick = () => {
          jodit.s.insertHTML(createSpan(id, label, jodit));
          dialog.close();
        };

        item.addEventListener("keydown", e => {
          const current = e.currentTarget as HTMLElement;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = current.nextElementSibling as HTMLElement;
            if (next) next.focus();
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = current.previousElementSibling as HTMLElement;
            if (prev) prev.focus();
          } else if (e.key === "Enter") {
            e.preventDefault();
            current.click();
          }
        });

        container.appendChild(item);
      });

      dialog.setContent(container);
      dialog.open();

      const firstItem = container.querySelector<HTMLElement>(
        ".merge-field-option",
      );
      if (firstItem) firstItem.focus();

      return dialog;
    };

    jodit.options.controls[MERGE_FIELD_KEY] = {
      name: MERGE_FIELD_KEY,
      tooltip: "Insertar {{variable}}",
      text: "{•}",
      popup: (editor: any, _current: any, close: () => void) => {
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

    jodit.events.on("keydown", (event: KeyboardEvent) => {
      if (event.key === "{") {
        const selection = jodit.s;
        if (!selection || !selection.range) return;

        const range = selection.range;
        const textNode = range.startContainer;

        if (textNode.nodeType === Node.TEXT_NODE && textNode.textContent) {
          const textBefore = textNode.textContent.slice(0, range.startOffset);

          if (textBefore.endsWith("{")) {
            event.preventDefault();
            jodit.execCommand("delete");
            const dialog = openDialog();
            const firstOption = dialog.container.querySelector<HTMLElement>(
              ".merge-field-option",
            );
            if (firstOption) {
              firstOption.focus();
            }
          }
        }
      }
    });

    const toggleMergeFieldEditable = () => {
      const selection = jodit.s.range;
      if (!selection) return;

      const mergeFields =
        jodit.editor.querySelectorAll<HTMLElement>(".merge-field");
      mergeFields.forEach(span => {
        const spanRange = document.createRange();
        spanRange.selectNodeContents(span);

        const fullySelected =
          selection.compareBoundaryPoints(Range.START_TO_START, spanRange) <=
            0 &&
          selection.compareBoundaryPoints(Range.END_TO_END, spanRange) >= 0;

        span.contentEditable = fullySelected ? "true" : "false";
      });
    };

    document.addEventListener("selectionchange", toggleMergeFieldEditable);

    jodit.events.on("beforeDestruct", () => {
      document.removeEventListener("selectionchange", toggleMergeFieldEditable);
    });
  }
  /**
   * Limpia los eventos y recursos utilizados por el plugin al destruir
   * la instancia del editor.
   */
  destruct(jodit: IJodit) {
    jodit.events.off("afterInit");
    jodit.events.off("keydown");
  }
}
