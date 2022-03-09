import Logs from "./Logs.js";
import { getRandom } from "../utils.js";
import { player1, player2 } from "../class/Player.js";
import { createElement } from "../utils.js";
import { HIT, ATTACK } from "../constants/constants.js";

const $randomButton = document.querySelector(".button");

class Game {
  constructor(props) {
    this.$arena = props.$arena;
    this.$formFight = props.$formFight;
  } 

  
  start = () => {
    this.$arena.append(player1.createPlayer(), player2.createPlayer());

    new Logs({type: 'start', player1, player2}).generateLogs()

    this.$formFight.addEventListener("submit", (e) => {
      e.preventDefault();

      this.fight(this.$formFight, player1, player2);
      this.checkResult(this.$arena);
    });
  };

  playerWins = (name) => {
    const $winTitle = createElement("div", "winTitle");

    if (name) {
      $winTitle.innerText = name + " wins";
    } else {
      $winTitle.innerText = "draw";
    }

    return $winTitle;
  };

  createReloadButton = () => {
    const $reloadWrap = createElement("div", "reloadWrap");
    const $reloadButton = createElement("button", "button");

    $reloadButton.innerText = "restart";
    $reloadWrap.append($reloadButton);

    return $reloadWrap;
  };

  enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  };

  playerAttack = (form) => {
    let attack = {
      value: 0,
      hit: "",
      defence: "",
    };
    if (form) {
      for (let item of form) {
        if (item.checked && item.name === "hit") {
          attack.value = getRandom(HIT[item.value]);
          attack.hit = item.value;
        }

        if (item.checked && item.name === "defence") {
          attack.defence = item.value;
        }

        item.checked = false;
      }
    }

    return attack;
  };

  checkResult = () => {
    if (player1.hp <= 0 || player2.hp <= 0) {
      $randomButton.disabled = true;
      const $reloadButton = this.createReloadButton();
      this.$arena.append($reloadButton);

      $reloadButton.addEventListener("click", () => {
        window.location.reload();
      });
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
      this.$arena.append(this.playerWins(player2.name));
      new Logs({type: 'end', player2, player1}).generateLogs()
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      this.$arena.append(this.playerWins(player1.name));
      new Logs({type: 'end', player1, player2}).generateLogs()
    } else if (player1.hp === 0 && player2.hp === 0) {
      new Logs({type: 'draw', player1, player2}).generateLogs()
      this.$arena.append(this.playerWins());
    }
  };

  fight = ($formFight, player1, player2) => {
    const { hit, defence, value } = this.playerAttack($formFight);
    const {
      hit: enemyHit,
      defence: enemyDefence,
      value: enemyValue,
    } = this.enemyAttack();

    if (hit !== enemyDefence) {
      player2.changeHP(value);
      player2.renderHP();
      console.log(1)
      new Logs({type: 'hit', player1: player1, player2: player2, player_hp: value}).generateLogs()
    } else {
      new Logs({type: 'defence', player1: player1, player2: player2}).generateLogs()
    }

    if (enemyHit !== defence) {
      player1.changeHP(enemyValue);
      player1.renderHP();
      new Logs({type: 'hit', player1: player2, player2: player1, player_hp: enemyValue}).generateLogs()
    } else {
      new Logs({type: 'defence', player1: player2, player2: player1}).generateLogs()
    }
  };
}

export default Game;
