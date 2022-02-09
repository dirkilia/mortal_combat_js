const player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Hook'],
    attack: () => {
        console.log(this.name + ' Fight...')
    }
}

const player2 = {
    name: 'SubZero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'IceShot'],
    attack: () => {
        console.log(this.name + ' Fight...')
    }
}

const createPlayer = (player_number, player_obj) => {
    const $player = document.createElement('div');
    $player.classList.add(player_number)

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar')

    const $character = document.createElement('div');
    $character.classList.add('character')
    const $player_img  = document.createElement('img');
    $player_img.src = player_obj.img

    const $life = document.createElement('div');
    $life.classList.add('life')    
    $life.style.width = '100%'

    const $name = document.createElement('div');
    $name.classList.add('name')
    $name.innerText = player_obj.name

    $player.append($progressBar, $character)
    $progressBar.append($life, $name)
    $character.append($player_img)
    
    const $arena = document.querySelector('.arenas')
    $arena.append($player)
}

createPlayer('player1', player1)
createPlayer('player2', player2)

