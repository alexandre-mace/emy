import React, { Component } from 'react';
import Modal from 'react-awesome-modal';



export default class Item extends React.Component {
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
      console.log(this.props);
      return(
        <li key={this.props.item['@id']}>

                <img src={require('../assets/img/1.jpg')} className="img-produit" alt=""/>

              <div className="ctn-desc-item">
                  <h2>{this.props.item['name']}</h2>
                  
                  <span>
                  <img src={require('../assets/img/calendar.png')} className="img-calendar" alt=""/>
                      DDP : <span>{this.props.item['expirationDate']}</span>
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
                        <img src={require('../assets/img/1.jpg')} className="img-produit" alt=""/>
                          <span>
                            <h4>{this.props.item['name']}</h4>
                            <p>
                                <img src={require('../assets/img/calendar.png')} className="img-calendar" alt=""/>
                                DDP : <span>{this.props.item['expirationDate']}</span>
                            </p>
                            <button type="button" name="button">{this.props.item['phoneNumber']}</button>
                          </span>
                        </div>

                    </div>
                </Modal>
              </li>
      );
    }
}

// ProductList.propTypes = {
//     name: PropTypes.string.isRequired,
//     expirationDate: PropTypes.string.isRequired,
// };
  
