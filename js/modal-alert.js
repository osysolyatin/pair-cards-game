import { clearModal, showModal } from "./modal.js";
import { clearGameField } from "./utils.js";

// Модальное окно для сообщений

export function createModalAlertWindow(title = "Привет") {
  const modal = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("h5");
  const buttonClose = document.createElement("button");
  const buttonCloseSpan = document.createElement("span");

  modal.classList.add("modal");
  modal.setAttribute("tabIndex", "-1");
  modalDialog.classList.add("modal-dialog");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header");
  modalTitle.classList.add("modal-title");
  buttonClose.classList.add("close");
  buttonClose.setAttribute("data-dismiss", "modal");
  buttonClose.type = "button";
  buttonClose.setAttribute("aria-label", "Закрыть");
  buttonCloseSpan.setAttribute("aria-hidden", "true");
  buttonCloseSpan.innerHTML = "&times;";

  modalTitle.textContent = title;

  modal.append(modalDialog);
  modalDialog.append(modalContent, buttonClose);
  buttonClose.append(buttonCloseSpan);
  modalContent.append(modalHeader);
  modalHeader.append(modalTitle);

  modal.addEventListener("click", function (e) {
    if (e.target.closest(".close")) {
      clearModal(modal);
      clearGameField(document.getElementById("game"));
    }
    // if (e.target.closest(".modal-dialog")) {
    //   return;
    // } else clearModal(modal);
  });

  showModal(modal);

  return { modal, buttonClose };
}
