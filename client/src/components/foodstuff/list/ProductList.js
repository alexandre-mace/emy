import React, { Component } from 'react';
import Modal from 'react-awesome-modal';



class Item extends React.Component {
    constructor(){
        super();
        this.state = {
          visible: false,
        }
        
    }

    openModal() {
        this.setState({
          visible : true
        });
      }
    
      closeModal() {
        this.setState({
          visible : false
        });
      }
    

    render() {
      return(
        <li>
        <img src={this.props.image} className="img-produit" alt=""/>
        <div className="ctn-desc-item">
            <h2>{this.props.name}</h2>
            
            <span>
            <img src={require('../assets/img/calendar.png')} className="img-calendar" alt=""/>
                DDP : <span>{this.props.expirationDate}</span>
            </span>

            <a className="take-it-infos" value="Open" onClick={() => this.openModal()}>Je prends !</a>
            <a href="">
            <img src={require('../assets/img/place-localizer.png')} className="img-calendar" alt=""/>
            Localiser
            </a>
        </div>

        <Modal visible={this.state.visible} width="400" className="modal-popup modal-popup2" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div className="popup-takeit">
                <img src={require('../assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>

                <h3>Planifier le rendez-vous !</h3>

                <div className="side-product-popup">
                  <img src={this.props.image} alt="" />

                  <span>
                    <h4>{this.props.name}</h4>
                    <p>
                        <img src={require('../assets/img/calendar.png')} className="img-calendar" alt=""/>
                        DDP : <span>{this.props.expirationDate}</span>
                    </p>
                    <button type="button" name="button">{this.props.phoneNumber}</button>
                  </span>
                </div>

            </div>
        </Modal>
    </li>
      );
    }
}

export default class ProductList extends Component {
  constructor(){
    super();
    this.state = {
        data: [
          {
            "id": 1,
            "name": "Cordon bleu au fromage",
            "expirationDate": "19 février 2019",
            "address": "string",
            "phoneNumber": "+33 6 90 80 70 60",
            "availabilities": [
              "string"
            ],
            "image": "https://www.carrefour.fr/media/1500x1500/Photosite/PGC/P.L.S./3266980028428_PHOTOSITE_20150703_171715_0.jpg?placeholder=1"
          },
          {
            "id": 2,
            "name": "Charal champignons",
            "expirationDate": "19 février 2019",
            "address": "string",
            "phoneNumber": "+33 6 90 80 70 99",
            "availabilities": [
              "string"
            ],
            "image": "https://www.carrefour.fr/media/1500x1500/Photosite/PRODUITS_FRAIS_TRANSFORMATION/BOUCHERIE_VOLAILLE/3181232220071_PHOTOSITE_20180110_044858_0.jpg?placeholder=1"
          },
          {
            "id": 3,
            "name": "Cordon bleu au fromage",
            "expirationDate": "19 février 2019",
            "address": "string",
            "phoneNumber": "+33 6 90 80 70 60",
            "availabilities": [
              "string"
            ],
            "image": "https://www.carrefour.fr/media/1500x1500/Photosite/PGC/P.L.S./3266980028428_PHOTOSITE_20150703_171715_0.jpg?placeholder=1"
          },
          {
            "id": 4,
            "name": "Cordon bleu au fromage",
            "expirationDate": "19 février 2019",
            "address": "string",
            "phoneNumber": "+33 6 90 80 70 60",
            "availabilities": [
              "string"
            ],
            "image": "https://www.carrefour.fr/media/1500x1500/Photosite/PGC/P.L.S./3266980028428_PHOTOSITE_20150703_171715_0.jpg?placeholder=1"
          },
          {
            "id": 5,
            "name": "Cordon bleu au fromage",
            "expirationDate": "19 février 2019",
            "address": "string",
            "phoneNumber": "+33 6 90 80 70 60",
            "availabilities": [
              "string"
            ],
            "image": "https://www.carrefour.fr/media/1500x1500/Photosite/PGC/P.L.S./3266980028428_PHOTOSITE_20150703_171715_0.jpg?placeholder=1"
          },
          {
            "id": 6,
            "name": "Cordon bleu au fromage",
            "expirationDate": "19 février 2019",
            "address": "string",
            "phoneNumber": "+33 6 90 80 70 60",
            "availabilities": [
              "string"
            ],
            "image": "https://www.carrefour.fr/media/1500x1500/Photosite/PGC/P.L.S./3266980028428_PHOTOSITE_20150703_171715_0.jpg?placeholder=1"
          }
        ]
    }
  }

  componentDidMount() {

  }
 
  myList(items) {
      return (
      <div>
      <ul className="ul-list-map" id="myUL">
        {this.state.data.map(item => <Item key={item.id} name={item.name} expirationDate={item.expirationDate} image={item.image} phoneNumber={item.phoneNumber} />)}
      </ul>
      </div>
    );
  }

  render() {

    return (
      <div>
         { this.myList() } 
      </div>
    );
  }
}


// ProductList.propTypes = {
//     name: PropTypes.string.isRequired,
//     expirationDate: PropTypes.string.isRequired,
// };
  
