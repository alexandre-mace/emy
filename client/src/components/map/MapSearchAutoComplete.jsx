import { GoogleComponent } from './GoogleComponent';
import React, { Component } from 'react';

const API_KEY = 'AIzaSyCgFf-er2mba4V3HG0awy_w7M13nlrNtaY';  

class MapSearchAutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
    };

  }

  render() {
    return (
      <>
        <GoogleComponent
          apiKey={API_KEY}
          language={'fr'}
          coordinates={true}
          locationBoxStyle={'form-control'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => {
              this.setState({ place: e })
              if (this.props.formContext) {
                this.props.onChange(e.place);
              }
              console.log(e);
          }}
          label={this.props.label}
          id={this.props.id}
          name={'address'}
          required={'required'}
          placeholder={"Entrez une localisation..."}
          labelFor="mapsearch_address"
        />

        {
          this.props.mapSearchContext && this.state.place && this.state.place.coordinates && 
            <button type="submit" onClick={() => this.props.goToAddress(this.state.place.coordinates)}>Y aller</button>
        }

      </>
    )
  } 
}

export default MapSearchAutoComplete;