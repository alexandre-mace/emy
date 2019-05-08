import React from 'react';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { update } from '../../actions/foodstuff/update';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticationService } from '../../services';
import {LayoutContext} from "../block/Layout";

class FoodstuffListItem extends React.Component {
    static propTypes = {
        update: PropTypes.func.isRequired
    };
    static contextType = LayoutContext;
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: false,
            image: '',
            currentUser: null
        }
    }

    componentDidMount() {
        let self = this;
        if (this.props.item['image']) {
            axios.get(`http://localhost:8080${this.props.item['image']}`)
                .then(function (response) {
                    // handle success

                    self.setState({image: 'http://localhost:8080/medias/' + response.data.contentUrl})

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
        if (authenticationService.currentUserValue) {
            this.setState({currentUser: authenticationService.currentUserValue})
        }
    }

    componentDidUpdate() {
        if (authenticationService.currentUserValue && this.state.currentUser && authenticationService.currentUserValue['@id'] !== this.state.currentUser['@id']) {
            this.setState({currentUser: authenticationService.currentUserValue})
        } else if (!authenticationService.currentUserValue && this.state.currentUser ) {
            this.setState({currentUser: authenticationService.currentUserValue})
        } else if (authenticationService.currentUserValue && !this.state.currentUser) {
            this.setState({currentUser: authenticationService.currentUserValue})
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
            Array.from(document.getElementsByClassName('foodstuff-list-item')).forEach(function(element) {
                if (element.parentNode.className.includes('selected')) {
                    element.parentNode.classList.remove('selected');
                    const foodstuffId = /[^-]*$/.exec(element.parentNode.className.replace(/ .*/,''))[0];
                    let marker = document.getElementsByClassName('marker-' + foodstuffId)[0];
                    if (marker.className.includes('bounce-infinite')) {
                        marker.classList.remove('bounce-infinite');
                    } else if (marker.className.includes('bounce')){
                        marker.classList.remove('bounce');
                    }
                }
            });
            foodstuff.classList.add('selected');
            marker.classList.add('bounce-infinite');
            this.setState({selected: true});
        }
    }

    askingToOwn = () => {
        this.props.update(this.props.item, { isAwaiting: true, askingToOwn: authenticationService.currentUserValue['@id'] })
            .then(response => {
                this.props.handleProductTaken();
                this.closeModal();
            });
    };

    render() {
        return(
            <li key={this.props.item['@id']} className={'foodstuff-' + this.props.item['id']}>
                <div className="foodstuff-list-item" onClick={this.handleClick}>
                    <img src={this.state.image} className="img-produit" alt=""/>
                    <div className="foodstuff-list-item-description">
                        <h2 className="foodstuff-name">{this.props.item['name']}</h2>
                        <span>
                        <img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/>
                        <span className="expirationDate">Date limite de consommation {this.props.item['expirationDate']}</span>
                        </span>
                        <div>
                            {this.state.currentUser ? (
                                <button className="take-it" value="Open" onClick={() => this.openModal()}>Je prends !</button>
                            ) : (
                                <button className="take-it" value="Open" onClick={this.context.openLoginModal}>Je prends !</button>
                            )}
                            <button className="localize-it">
                                <img src={require('./assets/img/place-localizer.png')} className="img-calendar" alt=""/>
                                Localiser
                            </button>
                        </div>
                    </div>
                </div>

                <Modal width="800" visible={this.state.visible} effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="modal-style">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>
                        <h3 className="modal-style-title">Planifier le rendez-vous !</h3>
                        {this.props.deleteError && (
                            <div className="alert alert-danger" role="alert">
                                <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                                {this.props.deleteError}
                            </div>
                        )}
                        <div className="modal-take-it-foodstuff-description">
                            <div className="m-4">
                                <img src={this.state.image} className="foodstuff-img" alt=""/>
                            </div>
                            <div className="d-flex flex-column m-4">
                                <h4 className="modal-take-it-foodstuff-name">{this.props.item['name']}</h4>
                                <p>Disponibilités : {this.props.item.availabilities}</p>
                                <span><img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/> {this.props.item['expirationDate']}</span>
                                <span>Tel :{this.props.item['phoneNumber']}</span>
                                <button className="btn form-btn" onClick={this.askingToOwn} type="submit" name="button">Je m'engage à prendre ce produit</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </li>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    update: (item, values) => dispatch(update(item, values)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodstuffListItem);
