import Game from "./class/Game.js";

const $arena = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");

const game = new Game({
  $arena,
  $formFight
})

game.start()