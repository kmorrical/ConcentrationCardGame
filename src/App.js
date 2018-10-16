import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import swal from 'sweetalert';
import Cards from './cards.js';
import Header from './header.js';

const API = "https://deckofcardsapi.com/api/deck/new/draw/?count=52";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      cards: [],
      cardRow1: [],
      cardRow2: [],
      cardRow3: [],
      cardRow4: [],
      card1Selected: '',
      card2Selected: '',
      cardsSelected: [],
      cardRowsDisplay: [],
      cardClass: 'card-image',
    };
  }

  //don't necessarily need the below lifecycle functions for my app to work, but keeping them to demonstrate I know about them
  componentWillMount(){

  }

  componentDidMount(){

  }

  componentWillUpdate(){

  }

  shuffle = () => {
    this.setState({cardClass: 'card-image'});
    this.fetchAndLog();
  }

  fetchAndLog = async () => {

    const response = await fetch(API);
    const json = await response.json();
    //separating into groups of 13 for rows
    const cardRows = _.chunk(json.cards, 13);
    //adding properties of "matched" and "visible" to cards
    _.forEach(json.cards, function(card) {
      card.matched = false;
      card.visibility = 'visible';
    });

    //creating animation delay for cards to appear as if they are being dealt
    for (let h = 0; h < cardRows.length; h++){
      for (let i = 0; i < cardRows[h].length; i++) {
        let secondCount = i;
        secondCount -= i*.9;
        const secondString = secondCount.toString();
        const secondStringS = secondString + "s";
        cardRows[h][i].animationDelay = secondStringS;
      }
    }

    this.setState({cardClass: 'card-image-animation',
                    cards: json.cards, 
                    cardRowsDisplay: cardRows,
                  });
  }

  fireDirections = () => {
    swal("Instructions", "Click to flip over a card. Flip over two cards and see if they match. If they do not, they will flip back over. If they do, they will disappear. Play until all cards disappear.", "success");
  }

  selectCard = (e) => {
    const cardSelected = e.target.id;
    if (this.state.card1Selected !== cardSelected) {

    let cardsSelectedCopy = this.state.cardsSelected.slice();
    cardsSelectedCopy.push(cardSelected);
    this.setState({cardsSelected: cardsSelectedCopy});

      if (!this.state.card1Selected){
      this.setState({card1Selected: e.target.id});
      }
      else {
        this.setState({card2Selected: e.target.id});
        this.checkCards(cardsSelectedCopy);
      }
    }
    else {
      //sweet alert
      swal("Warning", "Please select a second card", "warning");
    }
  }

  checkCards = (cardsSelectedCopy) => {

    const cardANumber = cardsSelectedCopy[0].slice(0,1);
    const cardBNumber = cardsSelectedCopy[1].slice(0,1);
    const editedCards = this.state.cards.slice();

    if (cardANumber === cardBNumber) {

      for (let i = 0; i <  editedCards.length; i++){
        if ((editedCards[i].code === cardsSelectedCopy[0]) || (editedCards[i].code === cardsSelectedCopy[1])) {
          setDelay(editedCards[i]);
          editedCards[i].matched = true;
          function setDelay(card){
            setTimeout(function(){
              card.visibility = 'hidden';
            }, 900)
          }
        } 
      }
      this.setState({cards: editedCards, cardsSelected: []});
    }
    else{ 
      cardsSelectedCopy = [];
    }
    this.clearCards();
  }

  clearCards = () => {
    setTimeout(function(){
      this.setState({card1Selected : "", card2Selected: "", cardsSelected: []}
    )}.bind(this), 900);
    const gameOver = _.every(this.state.cards, 'matched');
    if (gameOver) {
      //sweet alert
      swal({
        title: "Congrats!",
        text: "YOU MATCHED ALL OF THE CARDS!",
        icon: 'success',
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <button type="button" className="btn btn-darkred btn-lg" onClick={this.shuffle}>Start New Game</button>
        <button type="button" className="btn btn-darkred btn-lg" onClick={this.fireDirections}>How to Play</button>
         <div>
            <Cards cardClass={this.state.cardClass}
                  card1Selected={this.state.card1Selected}
                  card2Selected={this.state.card2Selected}
                  selectCard={this.selectCard}
                  cardRowsDisplay={this.state.cardRowsDisplay}/>
          </div>     
      </div>
    );
  }
}

export default App;
