class Api {
  constructor(props) {
    this.hit = props.hit;
    this.defence = props.defence;
  }
  
  async getHero() {
    const hero = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    );
    const result = await hero.json();

    return result;
  }

  async getHeroesArray() {
    const heroesArray = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    );
    const result = await heroesArray.json();

    return result;
  }

  async getPlayersActionsArray() {
    const PlayersActionsArray = fetch("http://reactmarathon-api.herokuapp.com/api/mk/player/fight", {
      method: "POST",
      body: JSON.stringify({
        hit,
        defence,
      }),
    });

    const result = await PlayersActionsArray.json();

    return result;
  }
}

export default Api;
