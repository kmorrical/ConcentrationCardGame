import React, { Component } from 'react';

//images for suit logos on top. know this was not necessary but wanted to personalize it a bit
const club = "https://res.cloudinary.com/osidekweenyasss/image/upload/v1539469916/greyclub2.png";
const spade = "https://res.cloudinary.com/osidekweenyasss/image/upload/v1539469916/greyclub.png";
const heart = "https://res.cloudinary.com/osidekweenyasss/image/upload/v1539469916/greyheart.png";
const diamond = "https://res.cloudinary.com/osidekweenyasss/image/upload/v1539469915/greydiamond.png";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
  	return(
  	<div>
        <header className="App-header">
          <img src={club} className="suit-logo" alt="club-icon" />
          <img src={heart} className="suit-logo" alt="heart-icon" />
          <img src={diamond} className="suit-logo" alt="diamond-icon" />
          <img src={spade} className="suit-logo" alt="spade-icon" />
          <h1 className="app-heading">Concentration</h1>
        </header>
  	</div>
  	)
  }
}
export default Header;
