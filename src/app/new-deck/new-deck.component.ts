import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.css']
})
export class NewDeckComponent implements OnInit {
  constructor() {}

  suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds']
  ranks = [
    'Ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King'
  ]
  values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
  deck = []
  playerHand = []
  dealerHand = []
  pOneHandValue = 0
  evaluatedOne = false
  evaluatedTwo = false
  evaluatedThree = false

  createDeck = () => {
    this.suits.map(suit => {
      return this.ranks.map((rank, index) => {
        const value = this.values[index]
        const card = { suit, rank, value }
        return this.deck.push(card)
      })
    })
    console.log(this.deck)
    this.shuffle(this.deck)
    this.deal(this.playerHand)
    this.deal(this.dealerHand)
    console.log(this.playerHand, 'playerHand')
    console.log(this.dealerHand, 'dealerHand')
    console.log(this.deck, 'after deal')
    this.getValue()
  }

  shuffle = deck => {
    for (let i = this.deck.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = this.deck[j]
      this.deck[j] = this.deck[i]
      this.deck[i] = temp
    }
    console.log(this.deck, 'shuffled')
  }

  deal = key => {
    for (let i = 0; i <= 1; i++) {
      const Card = this.deck.shift()
      key.unshift(Card)
    }
  }

  getValue = () => {
    const x = this.playerHand.map(card => {
      return card.value
    })
    const y = x.reduce((accum, curr) => {
      return accum + curr
    })
    console.log(y, 'this is y')
    this.pOneHandValue = y
    if (this.pOneHandValue === 21) {
      this.evaluatedOne = true
    } else if (this.pOneHandValue > 21) {
      this.evaluatedTwo = true
    }
  }

  hitMe = () => {
    for (let i = 0; i < 1; i++) {
      const Card = this.deck.shift()
      this.playerHand.unshift(Card)
    }
    this.getValue()
    console.log(this.playerHand, 'after Hit')
  }

  hitDealer = () => {
    for (let i = 0; i < 1; i++) {
      const Card = this.deck.shift()
      this.dealerHand.unshift(Card)
    }
  }

  stay = () => {
    const x = this.dealerHand.map(card => {
      return card.value
    })
    const y = x.reduce((accum, curr) => {
      return accum + curr
    })
    if (y < 16) {
      this.hitDealer()
      this.evaluate()
    } else if (y === 16) {
      this.hitDealer()
      this.evaluate()
    } else if (y > 16) {
      this.evaluate()
    }
  }

  evaluate = () => {
    const x = this.dealerHand.map(card => {
      return card.value
    })
    const y = x.reduce((accum, curr) => {
      return accum + curr
    })
    if (y > 21) {
      this.evaluatedOne = true
    }
    if (y === 21) {
      this.evaluatedTwo = true
    } else if (y === 16 && y < this.pOneHandValue) {
      this.evaluatedOne = true
    } else if (y === 21 && y > this.pOneHandValue) {
      this.evaluatedTwo = true
    } else if (y < 16 && y < this.pOneHandValue) {
      this.evaluatedOne = true
    } else if (y < 16 && y > this.pOneHandValue) {
      this.evaluatedTwo = true
    } else if (y > 16 && y < 21 && y < this.pOneHandValue) {
      this.evaluatedOne = true
    } else if (y > 16 && y < 21 && y > this.pOneHandValue) {
      this.evaluatedTwo = true
    } else if (y > 16 && y < 21 && y === this.pOneHandValue) {
      this.evaluatedThree = true
    } else if (y < 16 && y === this.pOneHandValue) {
      this.evaluatedThree = true
    }
  }

  refresh(): void {
    window.location.reload()
  }

  ngOnInit() {
    this.createDeck()
  }
}
