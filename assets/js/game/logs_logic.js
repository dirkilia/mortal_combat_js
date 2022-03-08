import { getRandom } from "../utils.js";

const $chat = document.querySelector(".chat");

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

export const generateLogs = (type, player1, player2, player_hp) => {
  const time = new Date();
  const seconds =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  switch (type) {
    case "hit":
      const type_hit_length = logs[type].length;
      const hit_text = logs[type][getRandom(type_hit_length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      const hit_el = `<p>${time.getHours()}:${time.getMinutes()}:${seconds} ${hit_text} -${player_hp}hp ${
        player2.hp
      }/100</p>`;
      $chat.insertAdjacentHTML("afterbegin", hit_el);
      break;
    case "defence":
      const type_defence_length = logs[type].length;
      const defence_text = logs[type][getRandom(type_defence_length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      const defence_el = `<p>${time.getHours()}:${time.getMinutes()}:${seconds} ${defence_text} -0hp ${
        player2.hp
      }/100</p>`;
      $chat.insertAdjacentHTML("afterbegin", defence_el);
      break;
    case "start":
      const start_text = logs.start
        .replace(
          "[time]",
          `${time.getHours()}:${time.getMinutes()}:${
            time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
          }`
        )
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      const start_el = `<p>${start_text}</p>`;
      $chat.insertAdjacentHTML("afterbegin", start_el);
      break;
    case "draw":
      const draw_el = `<p>${logs.draw}</p>`;
      $chat.insertAdjacentHTML("afterbegin", draw_el);
    case "end":
      const type_end_length = logs[type].length;
      const end_text = logs[type][getRandom(type_end_length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      const end_el = `<p>${end_text}</p>`;
      $chat.insertAdjacentHTML("afterbegin", end_el);
    default:
      break;
  }
};
