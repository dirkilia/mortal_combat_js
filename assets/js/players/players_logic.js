import { createElement } from "../utils.js";
export const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Sword", "Hook"],
  attack,
  elHP,
  changeHP,
  renderHP,
};

export const player2 = {
  player: 2,
  name: "SubZero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Sword", "IceShot"],
  attack,
  elHP,
  changeHP,
  renderHP,
};

function attack() {
  console.log(this.name + " Fight...");
}

function changeHP(damage) {
  this.hp -= damage;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP() {
  return (this.elHP().style.width = this.hp + "%");
}

export const createPlayer = (player_obj) => {
  const $player = createElement("div", "player" + player_obj.player);
  const $progressBar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $player_img = createElement("img");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");

  $player_img.src = player_obj.img;
  $life.style.width = player_obj.hp + "%";
  $name.innerText = player_obj.name;

  $player.append($progressBar, $character);

  $progressBar.append($life, $name);

  $character.append($player_img);

  return $player;
};
