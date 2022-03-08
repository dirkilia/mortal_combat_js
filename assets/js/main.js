import { player1, player2, createPlayer } from "./players/players_logic.js";
import { generateLogs } from "./game/logs_logic.js";
import { checkResult, fight } from "./game/game_logic.js";

const $arena = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");


$arena.append(createPlayer(player1), createPlayer(player2));

generateLogs("start", player1, player2);

$formFight.addEventListener("submit", (e) => {
  e.preventDefault();

  fight($formFight, player1, player2);
  checkResult($arena);
});
