import { getCardsNull } from "./game.js";

export let cards = [];

// Создание массива чисел равное count*2

export function createNumbersArray(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i + 1, i + 1);
  }
  return arr;
}

// Перемешивание массива

export function shuffle(arr) {
  const newArr = [...arr];
  let currentIndex = newArr.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = newArr[currentIndex];
    newArr[currentIndex] = newArr[randomIndex];
    newArr[randomIndex] = temporaryValue;
  }

  return newArr;
}

// Создание карточек

export function createCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardFront = document.createElement("span");
    const cardBack = document.createElement("span");
    cardFront.classList.add("card__front");
    cardBack.classList.add("card__back");
    cardFront.textContent = arr[i];
    cardBack.textContent = "?";
    card.append(cardFront, cardBack);
    cards.push(card);
  }
  return cards;
}

// Отображение карточек в игровом контейнере

export function displayCards(cards, cardsWrapper) {
  for (let card of cards) {
    cardsWrapper.append(card);
  }
}

// Очистка игрового поля и массива с карточками

export function clearGameField(game) {
  game.innerHTML = "";
  cards = [];
  getCardsNull();
}
