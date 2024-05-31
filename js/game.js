import { createModalWindow } from "./modal.js";
import { timer } from "./countdown.js";
import {
  createNumbersArray,
  shuffle,
  createCards,
  displayCards,
  cards,
} from "./utils.js";

let firstCard = null;
let secondCard = null;
const root = document.documentElement;

export function getCardsNull() {
  firstCard = null;
  secondCard = null;
}

function changeDimentionsOfCardElements() {
  root.style.setProperty("--fontSize", 25 + "px");
  root.style.setProperty("--backfaceWidth", 25 + "px");
  root.style.setProperty("--backfaceHeight", 25 + "px");
  root.style.setProperty("--translateX", -5 + "px");
  root.style.setProperty("--translateY", 0);
}

export function startGame(game, count) {
  // Создание обёртки для карт и помещение ее в контейнер игрового поля

  game.classList.add("container");
  const cardsWrapper = document.createElement("div");
  cardsWrapper.classList.add("cards-wrapper");
  game.append(cardsWrapper);

  // Построение сетки игрового поля

  switch (count) {
    case "2":
      root.style.setProperty("--rowCount", count);
      break;

    case "6":
      root.style.setProperty("--rowCount", count);
      break;

    case "8":
      root.style.setProperty("--rowCount", count);
      changeDimentionsOfCardElements();
      break;

    case "10":
      root.style.setProperty("--rowCount", count);
      changeDimentionsOfCardElements();
      break;

    default:
      root.style.setProperty("--rowCount", 4);
      break;
  }

  // Создание карточек и отображение их в игровом поле

  let cardsNumbers = (count * count) / 2;
  count % 2 !== 0 ? (cardsNumbers = 8) : cardsNumbers;
  let numbers = createNumbersArray(cardsNumbers);
  let shuffledNumbers = shuffle(numbers);

  displayCards(createCards(shuffledNumbers), cardsWrapper);

  // Логика игры

  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (card.classList.contains("open")) return;

      if (firstCard === null || secondCard === null) {
        card.classList.add("open");
        firstCard === null
          ? (firstCard = e.currentTarget)
          : (secondCard = e.currentTarget);
      }

      if (firstCard !== null && secondCard !== null) {
        if (
          Number(firstCard.firstChild.textContent) !==
          Number(secondCard.firstChild.textContent)
        ) {
          setTimeout(() => {
            firstCard.classList.remove("open");
            secondCard.classList.remove("open");
          }, 500);

          setTimeout(() => {
            getCardsNull();
          }, 600);
        } else {
          firstCard.classList.add("success");
          secondCard.classList.add("success");
          getCardsNull();
        }
      }
      if (cards.length === document.querySelectorAll(".success").length) {
        clearInterval(timer);
        getCardsNull();
        createModalWindow("Вы победили!", "Это было классно! Поиграем еще?");
      }
    });
  });
}
