const $arena = document.querySelector(".arenas");
const $randomButton = document.querySelector('.button')
const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Sword", "Hook"],
  attack,
  elHP,
  changeHP,
  renderHP
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
  renderHP
};

function attack () {
	console.log(this.name + " Fight...");
}

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

const createPlayer = (player_obj) => {
  const $player = createElement("div", 'player' + player_obj.player);
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

function changeHP (damage) {
	
	this.hp -= damage

	if (this.hp <= 0) {
		this.hp = 0
	}

}

function elHP () {
	return document.querySelector('.player' + this.player + ' .life')
}

function renderHP () {
	return this.elHP().style.width = this.hp + '%'
}

const getRandom = (max) => {
	return Math.ceil(Math.random() * max)
}

const playerLose = (name) => {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose'

	return $loseTitle
}

const playerWins = (name) => {
	const $winTitle = createElement('div', 'winTitle');
	
	if (name) {
		$winTitle.innerText = name + ' wins'
	} else {
		$winTitle.innerText = 'draw'
	}

	return $winTitle
}

const createReloadButton = () => {
	const $reloadWrap = createElement('div', 'reloadWrap')
	const $reloadButton = createElement('button', 'button')

	$reloadButton.innerText = 'restart'
	$reloadWrap.append($reloadButton)

	return $reloadWrap
}

const checkResult = () => {

	if (player1.hp <= 0 || player2.hp <= 0) {
		$randomButton.disabled = true
		const $reloadButton = createReloadButton();
		$arena.append($reloadButton)

		$reloadButton.addEventListener('click', () => {
			window.location.reload()
		})
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arena.append(playerWins(player2.name))
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arena.append(playerWins(player1.name))
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arena.append(playerWins())
	}
}

$arena.append(
  createPlayer(player1),
  createPlayer(player2)
);

const enemyAttack = () => {
	const hit = ATTACK[getRandom(3) - 1]
	const defence = ATTACK[getRandom(3) - 1]

	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
}

const playerAttack = (form) => {
	let attack = {
		value: 0,
		hit: '',
		defence: ''
	}
	if (form) {
		for (let item of form) {
			if (item.checked && item.name === 'hit') {
				attack.value = getRandom(HIT[item.value])
				attack.hit = item.value;
			}
	
			if (item.checked && item.name === 'defence') {
				attack.defence = item.value
			}
	
			item.checked = false
		}
	}
	
	return attack
}

const fight = (player1, player2) => {
	const player = playerAttack($formFight)
	const enemy = enemyAttack()

	if (player.hit !== enemy.defence) {
		player2.changeHP(player.value)
		player2.renderHP()
	}

	if (enemy.hit !== player.defence) {
		player1.changeHP(enemy.value)
		player1.renderHP()
	}
}

$formFight.addEventListener('submit', (e) => {
	e.preventDefault();
	
	fight(player1, player2)
	checkResult()
})