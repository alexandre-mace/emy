import { GoogleComponent } from 'react-google-location' 

//... 
import React, { Component } from 'react';



const API_KEY = 'AIzaSyCgFf-er2mba4V3HG0awy_w7M13nlrNtaY';  

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
    };
  }

  render() {
      console.log(this.state.place);
    return (
      <div >
         <GoogleComponent
          placeholder={''}
          apiKey={API_KEY}
          language={'fr'}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => { this.setState({ place: e }) }} />
      </div>

    )
  } 
}


export default Search;