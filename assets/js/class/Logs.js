import { getRandom } from "../utils.js";
import { LOGS } from "../constants/constants.js";

const $chat = document.querySelector(".chat");

class Logs {
  constructor(props) {
    this.type = props.type 
    this.pl1 = props.player1 
    this.pl2 = props.player2 
    this.player_hp = props.player_hp
  } 


  generateLogs = () => {
    const time = new Date();
    const seconds =
      time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    switch (this.type) {
      case "hit":
        const type_hit_length = LOGS[this.type].length;
        const hit_text = LOGS[this.type][getRandom(type_hit_length - 1)]
          .replace("[playerKick]", this.pl1.name)
          .replace("[playerDefence]", this.pl2.name);
        const hit_el = `<p>${time.getHours()}:${time.getMinutes()}:${seconds} ${hit_text} -${this.player_hp} hp ${
          this.pl2.hp
        }/100</p>`;
        $chat.insertAdjacentHTML("afterbegin", hit_el);
        break;
      case "defence":
        const type_defence_length = LOGS[this.type].length;
        const defence_text = LOGS[this.type][getRandom(type_defence_length - 1)]
          .replace("[playerKick]", this.pl1.name)
          .replace("[playerDefence]", this.pl2.name);
        const defence_el = `<p>${time.getHours()}:${time.getMinutes()}:${seconds} ${defence_text} -0hp ${
          this.pl2.hp
        }/100</p>`;
        $chat.insertAdjacentHTML("afterbegin", defence_el);
        break;
      case "start":
        const start_text = LOGS.start
          .replace(
            "[time]",
            `${time.getHours()}:${time.getMinutes()}:${
              time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
            }`
          )
          .replace("[player1]", this.pl1.name)
          .replace("[player2]", this.pl2.name);
        const start_el = `<p>${start_text}</p>`;
        $chat.insertAdjacentHTML("afterbegin", start_el);
        break;
      case "draw":
        const draw_el = `<p>${LOGS.draw}</p>`;
        $chat.insertAdjacentHTML("afterbegin", draw_el);
      case "end":
        const type_end_length = LOGS[this.type].length;
        const end_text = LOGS[this.type][getRandom(type_end_length - 1)]
          .replace("[playerWins]", this.pl1.name)
          .replace("[playerLose]", this.pl2.name);
        const end_el = `<p>${end_text}</p>`;
        $chat.insertAdjacentHTML("afterbegin", end_el);
      default:
        break;
    }
  };
}

export default Logs
