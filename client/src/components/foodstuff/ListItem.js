import React from 'react';
import Modal from 'react-awesome-modal';

export default class ListItem extends React.Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: false
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

    handleClick = event => {
        let foodstuff = document.getElementsByClassName('foodstuff-' + this.props.item['id'])[0];
        let marker = document.getElementsByClassName('marker-' + this.props.item['id'])[0];
        if (foodstuff.className.includes('selected')) {
            foodstuff.classList.remove('selected');
            marker.classList.remove('bounce-infinite');
            this.setState({selected: false});
        } else {
            foodstuff.classList.add('selected');
            marker.classList.add('bounce-infinite');
            this.setState({selected: true});
        }
    }
    render() {
        return(
            <li key={this.props.item['@id']} className={'foodstuff-' + this.props.item['id']} onClick={this.handleClick}>
                <img src={require('./assets/img/1.jpg')} className="img-produit" alt=""/>
                <div className="ctn-desc-item">
                    <h2>{this.props.item['name']}</h2>
                    <span>
                        <img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/>
                        DDP : <span>{this.props.item['expirationDate']}</span>
                    </span>
                    <a className="take-it-infos" value="Open" onClick={() => this.openModal()}>Je prends !</a>
                    <div>
                        <img src={require('./assets/img/place-localizer.png')} className="img-calendar" alt=""/>
                        Localiser
                    </div>
                </div>

                <Modal visible={this.state.visible} width="400" className="modal-popup modal-popup2" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="popup-takeit">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>
                        <h3>Planifier le rendez-vous !</h3>
                        <div className="side-product-popup">
                            <img src={require('./assets/img/1.jpg')} className="img-produit" alt=""/>
                            <span>
                                <h4>{this.props.item['name']}</h4>
                                <p>
                                    <img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/>
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

