import { GoogleComponent } from './map/GoogleComponent'; 

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
    return (
      <div>
        <GoogleComponent
          apiKey={API_KEY}
          language={'fr'}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => { this.setState({ place: e }) }} 
          id={'foodstuff_address'}
          name={'address'}
          required={'required'}
        />
      </div>

    )
  } 
}


export default Search;