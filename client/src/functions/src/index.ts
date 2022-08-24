import randomId from './utils/randomId';


const RANDOM_ID_LENGTH = 6;


type Suit = "Hearts" | "Spades" | "Diamonds" | "Clubs"
type CardValue = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
type Card = {
    "suit": Suit,
    "value": CardValue
}

const POSSIBLE_SUITS: Suit[] = ["Hearts", "Spades", "Diamonds", "Clubs"];
const POSSIBLE_VALUES: CardValue[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

class Deck {
    public deck: Card[];
    constructor() {
        this.deck = this.buildDeck();
    }


    shuffle() {
        for (let current_index = 0; current_index < this.deck.length; current_index++) {
            let random_index = Math.floor(Math.random() * this.deck.length);
            [this.deck[current_index], this.deck[random_index]] = [this.deck[random_index], this.deck[current_index]];
        }
    }

    private buildDeck(): Card[] {
        let deck: Card[] = [];
        for (let suit of POSSIBLE_SUITS) {
            for (let value of POSSIBLE_VALUES) {
                // console.log(`${value}${suit}`);
                deck.push({
                    "suit": suit,
                    "value": value,
                })
            }
        }
        return deck;
    }

}
const d = new Deck()
d.shuffle();

// type Player = {
//     "id": number,
//     "name": string,
//     "hand": Card[]
// }


class Player {
    public hand: Card[];
    constructor(public id: number, public name: string) {
        this.hand = [];
    }
}

class Game {
    id: string;
    waiting_to_start: boolean;
    deck: Deck;
    players: Player[];
    trump_card: Card | null;
    constructor(public first_player_name: string, public max_players: number) {
        this.id = randomId(RANDOM_ID_LENGTH);
        this.players = [];
        this.trump_card = null;
        this.players.push(new Player(1, first_player_name))
        this.deck = new Deck();
        this.deck.shuffle();
        this.waiting_to_start = true;
    }

    public deal(number_of_cards: number) {
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

    public start() {
        console.log("starting");
        this.waiting_to_start = false;
    }
}

let g = new Game("brandon", 3)
g.deal(2);
console.log("g");
console.log(g);

export default Game;