import { createModalAlertWindow } from "./modal-alert.js";
import { createModalFormWindow } from "./modal-form.js";

let timerID;

// Диалоговое модальное окно с кнопкамиы

export function createModalWindow(
  title = "Modal title",
  modalText = "Modal Content text"
) {
  const modal = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("h5");
  const buttonClose = document.createElement("button");
  const buttonCloseSpan = document.createElement("span");
  const modalBody = document.createElement("div");
  const modalTextMesage = document.createElement("p");
  const modalFooter = document.createElement("div");
  const buttonYes = document.createElement("button");
  const buttonNo = document.createElement("button");

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
  modalBody.classList.add("modal-body");
  modalTextMesage.classList.add("modal-text");
  modalFooter.classList.add("modal-footer");
  buttonYes.classList.add("btn", "btn-yes");
  buttonYes.type = "button";
  buttonNo.classList.add("btn", "btn-no");
  buttonNo.type = "button";
  modalTitle.textContent = title;
  modalTextMesage.textContent = modalText;
  buttonYes.textContent = "Да";
  buttonNo.textContent = "Нет";

  modal.append(modalDialog);
  modalDialog.append(modalContent, buttonClose);
  buttonClose.append(buttonCloseSpan);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalHeader.append(modalTitle);
  modalBody.append(modalTextMesage);
  modalFooter.append(buttonYes, buttonNo);

  buttonClose.addEventListener("click", () => {
    clearModal(modal);
    showModal(createModalAlertWindow("До скорых встеч!").modal);
  });

  buttonNo.addEventListener("click", () => {
    clearModal(modal);
    createModalAlertWindow("До скорых встеч!");
  });

  buttonYes.addEventListener("click", () => {
    // clearGameField(game);
    clearModal(modal);
    setTimeout(
      () =>
        createModalFormWindow(
          "Добро пожаловать в игру!",
          "Введите кол-во пар карт (чётные числа от 2 до 10) ",
          "Начать игру"
        ),
      300
    );
  });
  // modal.addEventListener("click", function (e) {
  //   if (!e.target.closest(".modal-dialog")) {
  //     clearModal(modal);
  //   } else return;
  // });

  showModal(modal);

  return { modal, buttonClose, buttonYes, buttonNo };
}

export function showModal(modal) {
  document.body.append(modal);
  document.body.classList.add("modal-open");
  timerID = setTimeout(() => {
    modal.classList.add("show");
  }, 100);
}

export function clearTimer() {
  clearTimeout(timerID);
}

export function clearModal(modal) {
  document.body.classList.remove("modal-open");
  modal.classList.remove("show");
  setTimeout(() => modal.remove(), 300);
}
