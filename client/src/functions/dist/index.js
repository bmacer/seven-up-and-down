"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomId_1 = __importDefault(require("./utils/randomId"));
const RANDOM_ID_LENGTH = 6;
const POSSIBLE_SUITS = ["Hearts", "Spades", "Diamonds", "Clubs"];
const POSSIBLE_VALUES = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
class Deck {
    constructor() {
        this.deck = this.buildDeck();
    }
    shuffle() {
        for (let current_index = 0; current_index < this.deck.length; current_index++) {
            let random_index = Math.floor(Math.random() * this.deck.length);
            [this.deck[current_index], this.deck[random_index]] = [this.deck[random_index], this.deck[current_index]];
        }
    }
    buildDeck() {
        let deck = [];
        for (let suit of POSSIBLE_SUITS) {
            for (let value of POSSIBLE_VALUES) {
                // console.log(`${value}${suit}`);
                deck.push({
                    "suit": suit,
                    "value": value,
                });
            }
        }
        return deck;
    }
}
const d = new Deck();
d.shuffle();
// type Player = {
//     "id": number,
//     "name": string,
//     "hand": Card[]
// }
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hand = [];
    }
}
class Game {
    constructor(first_player_name, max_players) {
        this.first_player_name = first_player_name;
        this.max_players = max_players;
        this.id = (0, randomId_1.default)(RANDOM_ID_LENGTH);
        this.players = [];
        this.trump_card = null;
        this.players.push(new Player(1, first_player_name));
        this.deck = new Deck();
        this.deck.shuffle();
        this.waiting_to_start = true;
    }
    deal(number_of_cards) {
        // Check if enough cards can be dealt
        for (let player of this.players) {
            for (let i = 0; i < number_of_cards; i++) {
                let card = this.deck.deck.pop();
                if (card) {
                    player.hand.push(card);
                }
            }
        }
        let trump_card = this.deck.deck.pop();
        if (trump_card) {
            this.trump_card = trump_card;
        }
    }
    start() {
        console.log("starting");
        this.waiting_to_start = false;
    }
}
let g = new Game("brandon", 3);
g.deal(2);
console.log("g");
console.log(g);
exports.default = Game;
