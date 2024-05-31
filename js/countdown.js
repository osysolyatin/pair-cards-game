import { createModalWindow } from "./modal.js";
import { game } from "./main.js";

// Создаем контейнер для таймера c заголовком

export function createTimerContainerElements() {
  const title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = "Время игры";

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const countdown = document.createElement("div");
  countdown.classList.add("countdown");

  const minutes = document.createElement("div");
  minutes.classList.add("minutes");
  const numMinutes = document.createElement("p");
  numMinutes.classList.add("num");
  numMinutes.textContent = "00";
  const numMinutesName = document.createElement("span");
  numMinutesName.classList.add("name");
  numMinutesName.textContent = "минут";

  const seconds = document.createElement("div");
  seconds.classList.add("seconds");
  const numSeconds = document.createElement("p");
  numSeconds.classList.add("num");
  numSeconds.textContent = "00";
  const numSecondsName = document.createElement("span");
  numSecondsName.classList.add("name");
  numSecondsName.textContent = "секунд";

  game.append(title, wrapper);
  wrapper.append(countdown);
  countdown.append(minutes, seconds);
  minutes.append(numMinutes, numMinutesName);
  seconds.append(numSeconds, numSecondsName);
}

// функция склонения

function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

// Таймер

export let timer;

export function initCountdown(parent, to) {
  timer = setInterval(countdown, 1000);
  let totalSeconds = to * 60;
  function countdown() {
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    // const hours = Math.floor((totalSeconds / 3600) % 24);
    // const days = Math.floor(totalSeconds / 86400);

    const rootElements = document.querySelectorAll(parent);

    if (rootElements.length > 0) {
      rootElements.forEach((root) => {
        if (root.querySelector(".minutes")) {
          root.querySelector(".minutes .num").textContent = minutes;
          root.querySelector(".minutes .name").textContent = declOfNum(
            minutes,
            ["минута", "минуты", "минут"]
          );
        }

        if (root.querySelector(".seconds")) {
          root.querySelector(".seconds .num").textContent = seconds;
          root.querySelector(".seconds .name").textContent = declOfNum(
            seconds,
            ["секунда", "секунды", "секунд"]
          );
        }

        if (minutes <= 0 && seconds <= 0) {
          clearInterval(timer);

          root.textContent = "Время вышло!";
          createModalWindow("Вы проиграли :-(", "Поиграем еще?");
        }
      });
    } else {
      console.error("Countdown error: no parent mentioned");
    }
    totalSeconds -= 1;
  }

  countdown();
}
