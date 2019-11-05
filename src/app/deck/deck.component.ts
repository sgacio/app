import { Component, OnInit } from '@angular/core'
import { SourceListMap } from 'source-list-map'

@Component({
  selector: 'app-deck',
  template: `
    <p>
      {{ deck }}
    </p>
  `,
  styles: []
})
export class DeckComponent {
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

  createDeck = () => {
    this.suits.map(suit => {
      return this.ranks.map((rank, index) => {
        const value = this.values[index]
        return this.deck.push({ suit, rank, value })
      })
    })
    console.log(this.deck)
    this.shuffle(this.deck)
    this.deal(this.playerHand)
    this.deal(this.dealerHand)
    console.log(this.playerHand, 'playerHand')
    console.log(this.dealerHand, 'dealerHand')
    console.log(this.deck, 'after deal')
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

  ngOnInit() {
    this.createDeck()
  }
}
