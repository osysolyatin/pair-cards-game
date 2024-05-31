import { createModalFormWindow } from "./modal-form.js";

export const game = document.getElementById("game");
createModalFormWindow(
  "Добро пожаловать в игру!",
  "Введите кол-во пар карт (чётные числа от 2 до 10) ",
  "Начать игру"
);
