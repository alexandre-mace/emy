import React from 'react';
import Modal from 'react-awesome-modal';
import { authenticationService } from '../../services';
import {LayoutContext} from "../block/Layout";
import {ENTRYPOINT} from "../../config/entrypoint";
import PropTypes from 'prop-types';
import { update } from '../../actions/foodstuff/update';
import { connect } from 'react-redux';

class TakeFoodStuffModal extends React.Component {
    static contextType = LayoutContext;
    static propTypes = {
        update: PropTypes.func.isRequired
    };
    constructor(){
        super();
        this.state = {
            visible: false,
            currentUser: null
        };
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

    componentDidMount() {
        if (authenticationService.currentUserValue) {
            this.setState({currentUser: authenticationService.currentUserValue})
        }
    };

    componentDidUpdate() {
        if (authenticationService.currentUserValue && this.state.currentUser && authenticationService.currentUserValue['@id'] !== this.state.currentUser['@id']) {
            this.setState({currentUser: authenticationService.currentUserValue})
        } else if ((!authenticationService.currentUserValue && this.state.currentUser) || (authenticationService.currentUserValue && !this.state.currentUser)) {
            this.setState({currentUser: authenticationService.currentUserValue})
        }
    }

    askingToOwn = () => {
        this.props.update(this.props.foodstuff, { isAwaiting: true, askingToOwn: authenticationService.currentUserValue['@id'] })
            .then(() => {
                this.props.handleProductTaken();
                this.closeModal();
            });
    };

    render() {
        return(
            <>
                {this.state.currentUser ? (
                    <button className="take-it" value="Open" onClick={() => this.openModal()}>Je prends !</button>
                ) : (
                    <button className="take-it" value="Open" onClick={this.context.openLoginModal}>Je prends !</button>
                )}
                <Modal width="800" visible={this.state.visible} effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="modal-style">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>
                        <h3 className="modal-style-title">Planifier le rendez-vous !</h3>
                        <div className="modal-take-it-foodstuff-description">
                            <div className="m-4">
                                {this.props.image &&
                                    <img src={ENTRYPOINT + '/medias/' + this.props.image} className="foodstuff-img" alt=""/>
                                }                            </div>
                            <div className="d-flex flex-column m-4">
                                <h4 className="modal-take-it-foodstuff-name">{this.props.foodstuff['name']}</h4>
                                <p>Disponibilités : {this.props.foodstuff.availabilities}</p>
                                <span><img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/> {this.props.foodstuff['expirationDate']}</span>
                                <span>Tel :{this.props.foodstuff['phoneNumber']}</span>
                                <button className="btn form-btn" onClick={this.askingToOwn} type="submit" name="button">Je m'engage à prendre ce produit</button>
                            </div>
                        </div>
                    </div>
                </Modal>
           </>
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
)(TakeFoodStuffModal);

