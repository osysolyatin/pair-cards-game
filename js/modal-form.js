import { startGame } from "./game.js";
import { game } from "./main.js";
import { showModal, clearModal, clearTimer } from "./modal.js";
import { createModalAlertWindow } from "./modal-alert.js";
import { clearGameField } from "./utils.js";
import { initCountdown, createTimerContainerElements } from "./countdown.js";

// Модальное окно с фомой для ввода кол-ва карточек

export function createModalFormWindow(
  title = "Modal title",
  modalInputPlaceholder = "Введите кол-во пар карт для игры",
  buttonInputText = "Начать игру"
) {
  let durationTime = null;
  let count = 4;

  const modal = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("h5");
  const buttonClose = document.createElement("button");
  const buttonCloseSpan = document.createElement("span");
  const modalForm = document.createElement("form");
  const modalFormInput = document.createElement("input");
  const modalFormInputErrorSpan = document.createElement("span");
  const buttonSubmit = document.createElement("button");
  const durationTitle = document.createElement("h3");
  const durationCheckboxesWrapper = document.createElement("div");
  const durationTimerErrorSpan = document.createElement("span");
  const durationCheckbox1 = document.createElement("input");
  const durationLabel1 = document.createElement("label");
  const durationCheckbox2 = document.createElement("input");
  const durationLabel2 = document.createElement("label");
  const durationCheckbox3 = document.createElement("input");
  const durationLabel3 = document.createElement("label");

  modal.classList.add("modal");
  modal.setAttribute("tabIndex", "-1");
  modalDialog.classList.add("modal-dialog", "modal-dialog--form");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header");
  modalTitle.classList.add("modal-title");
  buttonClose.classList.add("close");
  buttonClose.setAttribute("data-dismiss", "modal");
  buttonClose.type = "button";
  buttonClose.setAttribute("aria-label", "Закрыть");
  buttonCloseSpan.setAttribute("aria-hidden", "true");
  buttonCloseSpan.innerHTML = "&times;";
  modalForm.classList.add("modal-form");
  modalFormInput.classList.add("modal-input");
  modalFormInputErrorSpan.classList.add("modal-input-error");
  buttonSubmit.classList.add("btn", "btn-form");
  durationTitle.classList.add("duration-title");

  durationCheckboxesWrapper.classList.add("duration-buttons-wrapper");
  durationTimerErrorSpan.classList.add("duration-timer-error");

  durationLabel1.classList.add("btn", "duration-button");
  durationLabel2.classList.add("btn", "duration-button");
  durationLabel3.classList.add("btn", "duration-button");

  durationCheckbox1.classList.add("duration-checkbox");
  durationCheckbox2.classList.add("duration-checkbox");
  durationCheckbox3.classList.add("duration-checkbox");

  durationCheckbox1.setAttribute("value", "1");
  durationCheckbox2.setAttribute("value", "2");
  durationCheckbox3.setAttribute("value", "3");

  durationCheckbox1.id = "durationCheckbox-1";
  durationCheckbox2.id = "durationCheckbox-2";
  durationCheckbox3.id = "durationCheckbox-3";

  durationCheckbox1.type = "checkbox";
  durationCheckbox2.type = "checkbox";
  durationCheckbox3.type = "checkbox";

  durationCheckbox1.name = "duration-time";
  durationCheckbox2.name = "duration-time";
  durationCheckbox3.name = "duration-time";

  durationLabel1.setAttribute("for", "durationCheckbox-1");
  durationLabel2.setAttribute("for", "durationCheckbox-2");
  durationLabel3.setAttribute("for", "durationCheckbox-3");

  buttonSubmit.type = "submit";
  modalTitle.textContent = title;
  modalFormInput.placeholder = modalInputPlaceholder;
  modalFormInputErrorSpan.textContent = "Ошибка";
  buttonSubmit.textContent = buttonInputText;
  buttonSubmit.disabled = true;
  durationTitle.textContent = "Выберите продолжительность игры в минутах";
  durationTimerErrorSpan.textContent = "Не выбрана продолжительность игры";
  durationLabel1.textContent = "1 минута";
  durationLabel2.textContent = "2 минуты";
  durationLabel3.textContent = "3 минуты";

  modal.append(modalDialog);
  modalDialog.append(modalContent, buttonClose);
  buttonClose.append(buttonCloseSpan);
  modalContent.append(modalHeader, modalForm);
  modalHeader.append(modalTitle);
  modalForm.append(
    modalFormInputErrorSpan,
    modalFormInput,
    durationTitle,
    durationCheckboxesWrapper,
    buttonSubmit
  );
  durationCheckboxesWrapper.append(
    durationTimerErrorSpan,
    durationCheckbox1,
    durationLabel1,
    durationCheckbox2,
    durationLabel2,
    durationCheckbox3,
    durationLabel3
  );

  const durationCheckboxes =
    durationCheckboxesWrapper.querySelectorAll(".duration-checkbox");

  durationCheckboxes.forEach((durationCheckbox) => {
    durationCheckbox.addEventListener("click", (event) => {
      durationTimerErrorSpan.classList.remove("alert-error");
      for (let i = 0; i < durationCheckboxes.length; i++) {
        if (durationCheckboxes[i] !== event.target) {
          durationCheckboxes[i].checked = false;
        }
      }
      if (event.target.checked) {
        durationTime = Number(event.target.value);
      } else durationTime = null;
    });
  });

  modal.addEventListener("click", function (e) {
    if (e.target.closest(".close")) {
      clearModal(modal);
      createModalAlertWindow("До скорых встеч!");
    }
    // if (e.target.closest(".modal-dialog")) {
    //   return;
    // } else clearModal(modal);
  });

  modalFormInput.addEventListener("input", () => {
    modalFormInputErrorSpan.classList.remove("alert-error");
    errorStylesRemove();

    if (!modalFormInput.value.trim()) {
      buttonSubmit.disabled = true;
      errorStylesRemove();
      return;
    }

    if (modalFormInput.value.trim() < 2 || modalFormInput.value.trim() > 10) {
      countInputErrorValidation("Введите корректное значение (от 2 до 10)");
      buttonSubmit.disabled = true;
      return;
    }

    if (isNaN(modalFormInput.value.trim()) || modalFormInput.value === " ") {
      countInputErrorValidation("Введенное значение не число");
      buttonSubmit.disabled = true;
      return;
    }

    if (modalFormInput.value.trim() % 2 !== 0) {
      countInputErrorValidation(
        "Число не является четным. Будет выведено игровое поле 4х4"
      );
    }
    modalFormInput.classList.add("valid");
    buttonSubmit.disabled = false;
  });

  modalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    modalFormInputErrorSpan.classList.remove("alert-error");
    durationTimerErrorSpan.classList.remove("alert-error");
    errorStylesRemove();

    if (durationTime === null) {
      durationTimerErrorSpan.classList.add("alert-error");
      modalFormInput.value = "";
      errorStylesRemove();
      buttonSubmit.disabled = true;
      return;
    }

    if (durationTime !== null && modalFormInput.value.trim()) {
      modalFormInputErrorSpan.classList.remove("alert-error");
      durationTimerErrorSpan.classList.remove("alert-error");
      errorStylesRemove();
      buttonSubmit.disabled = false;
    }

    if (modalFormInput.value.trim() < 2 || modalFormInput.value.trim() > 10) {
      modalFormInput.value = "";
      buttonSubmit.disabled = true;
      countInputErrorValidation("Введите корректное значение (от 2 до 10)");
      return;
    }

    if (isNaN(modalFormInput.value.trim()) || modalFormInput.value === " ") {
      modalFormInput.value = "";
      buttonSubmit.disabled = true;
      countInputErrorValidation("Введенное значение не число");
      return;
    }

    buttonSubmit.disabled = false;
    count = modalFormInput.value.trim();

    modalFormInput.value = "";
    buttonSubmit.disabled = true;
    clearModal(modal);
    clearGameField(game);
    createTimerContainerElements();
    startGame(game, count);
    initCountdown(".countdown", durationTime);
  });
  clearGameField(game);
  showModal(modal);

  return { modal, modalForm, modalFormInput, buttonSubmit };

  // Функция валидации формы ввода кол-ва карточек

  function countInputErrorValidation(message) {
    modalFormInputErrorSpan.textContent = message;
    modalFormInputErrorSpan.classList.add("alert-error");
    if (
      message === "Число не является четным. Будет выведено игровое поле 4х4"
    ) {
      modalFormInput.classList.add("valid");
      modalFormInputErrorSpan.classList.add("valid");
    }
  }

  function errorStylesRemove() {
    modalFormInput.classList.remove("valid");
    modalFormInputErrorSpan.classList.remove("valid");
  }
}
