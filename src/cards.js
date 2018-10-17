import React, { Component } from 'react';
const cardDown = "https://res.cloudinary.com/osidekweenyasss/image/upload/v1539213795/cardback.png";

class Cards extends Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
    	card1Selected: this.props.card1Selected,
    	card2Selected: this.props.card2Selected,
    	cardRowsDisplay: this.props.cardRowsDisplay,
    	cardClass: this.props.cardClass,
    };
  }

  componentWillReceiveProps(nextProps){
  	this.setState({	cardClass: nextProps.cardClass,
  					card1Selected: nextProps.card1Selected, 
  					card2Selected: nextProps.card2Selected,
  					cardRowsDisplay: nextProps.cardRowsDisplay,
  				}); 
  	}

  render(){
  	return(
  	<div className="card-component">
  		{this.state.cardRowsDisplay.map(function(cardRow, i){
  		return(
  	 	<div className="row card-row" key={i}>
          {
          cardRow.map(function(item, index){
            return (
            <div className="item" ref="imgDiv" key={index}>
            <img className={this.state.cardClass} ref="myRef" id={item.code} style={{flex: 1, height: undefined, width: undefined, animationDelay: item.animationDelay, visibility: item.visibility}} alt={item.value} 
            src={((this.state.card1Selected === item.code) || (this.state.card2Selected === item.code)) ? item.image : cardDown}	
            onClick={this.props.selectCard}/>
            </div>)
          	}.bind(this)
          )}
        </div>
    	)}.bind(this)
       )}
  	</div>
  	)
  }
}
export default Cards;
