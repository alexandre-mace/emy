import { GoogleComponent } from './GoogleComponent';
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
        <GoogleComponent
          apiKey={API_KEY}
          language={'fr'}
          coordinates={true}
          locationBoxStyle={'form-control'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => {
              this.setState({ place: e })
              this.props.onChange(e.place);
          }}
          label={this.props.label}
          id={this.props.id}
          name={'address'}
          required={'required'}
        />
    )
  } 
}

export default Search;