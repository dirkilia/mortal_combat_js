const $arena = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const $chat = document.querySelector(".chat");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const player1 = {
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

const player2 = {
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

function attack() {
  console.log(this.name + " Fight...");
}

const generateStartingLogs = (player1, player2) => {};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

const createPlayer = (player_obj) => {
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

const getRandom = (max) => {
  return Math.ceil(Math.random() * max);
};

const playerLose = (name) => {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = name + " lose";

  return $loseTitle;
};

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

const checkResult = () => {
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

const fight = (player1, player2) => {
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

const generateLogs = (type, player1, player2, player_hp) => {
  const time = new Date();
  const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  switch (type) {
    case "hit":
      const type_hit_length = logs[type].length;
      const hit_text = logs[type][getRandom(type_hit_length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      const hit_el = `<p>${time.getHours()}:${time.getMinutes()}:${seconds} ${hit_text} -${player_hp}hp ${
        player2.hp}/100</p>`;
      $chat.insertAdjacentHTML("afterbegin", hit_el);
      break;
    case "defence":
      const type_defence_length = logs[type].length;
      const defence_text = logs[type][getRandom(type_defence_length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      const defence_el = `<p>${time.getHours()}:${time.getMinutes()}:${seconds} ${defence_text} -0hp ${
        player2.hp}/100</p>`;
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

$arena.append(createPlayer(player1), createPlayer(player2));

generateLogs("start", player1, player2);

$formFight.addEventListener("submit", (e) => {
  e.preventDefault();

  fight(player1, player2);
  checkResult();
});
