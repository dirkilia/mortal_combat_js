import { createElement } from "../utils.js";

class Player {
  constructor(props) {
    this.name = props.name;
    this.player = props.player;
    this.hp = props.hp;
    this.img = props.img;
    this.selector = `player${this.player}`;
    this.rootSelector = props.rootSelector
  }

  attack = () => {
    console.log(this.name + " Fight...");
  };

  changeHP = (damage) => {
    this.hp -= damage;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.${this.selector} .life`);
  };

  renderHP = () => {
    return (this.elHP().style.width = this.hp + "%");
  };

  createPlayer = () => {
    const $player = createElement("div", `player${this.player}`);
    const $progressBar = createElement("div", "progressbar");
    const $character = createElement("div", "character");
    const $player_img = createElement("img");
    const $life = createElement("div", "life");
    const $name = createElement("div", "name");

    $player_img.src = this.img;
    $life.style.width = this.hp + "%";
    $name.innerText = this.name;

    $player.append($progressBar, $character);

    $progressBar.append($life, $name);

    $character.append($player_img);

    return $player;
  };
}

export const player1 = new Player({
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Sword", "Hook"],
  rootSelector: 'arenas'
})

export const player2 = new Player({
  player: 2,
  name: "SubZero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Sword", "IceShot"],
  rootSelector: 'arenas'
})
