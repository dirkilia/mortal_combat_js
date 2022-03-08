import { generateLogs } from "./logs_logic.js";
import { getRandom } from "../utils.js";
import { player1, player2 } from "../players/players_logic.js";
import { createElement } from "../utils.js";

const $randomButton = document.querySelector(".button");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const playerWins = (name) => {
  const $winTitle = createElement("div", "winTitle");

  if (name) {
    $winTitle.innerText = name + " wins";
  } else {
    $winTitle.innerText = "draw";
  }

  return $winTitle;
};

const createReloadButton = () => {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");

  $reloadButton.innerText = "restart";
  $reloadWrap.append($reloadButton);

  return $reloadWrap;
};

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const playerAttack = (form) => {
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

export const checkResult = ($arena) => {
  if (player1.hp <= 0 || player2.hp <= 0) {
    $randomButton.disabled = true;
    const $reloadButton = createReloadButton();
    $arena.append($reloadButton);

    $reloadButton.addEventListener("click", () => {
      window.location.reload();
    });
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arena.append(playerWins(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arena.append(playerWins(player1.name));
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    generateLogs("draw", player1, player2);
    $arena.append(playerWins());
  }
};

export const fight = ($formFight, player1, player2) => {
  const player = playerAttack($formFight);
  const enemy = enemyAttack();

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2, player.value);
  } else {
    generateLogs("defence", player1, player2);
  }

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemy.value);
  } else {
    generateLogs("defence", player2, player1);
  }
};
