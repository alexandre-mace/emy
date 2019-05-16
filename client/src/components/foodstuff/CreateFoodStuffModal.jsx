import React from 'react';
import Modal from 'react-awesome-modal';
import Create from './Create';
import { authenticationService } from '../../services';
import {LayoutContext} from "../block/Layout";

export default class CreateFoodStuffModal extends React.Component {
    static contextType = LayoutContext;
    constructor(){
        super();
        this.state = {
            visible: false,
            currentUser: null
        };
        this.closeModalAddProduct = this.closeModalAddProduct.bind(this);
    }

    openModalAddProduct() {
        this.setState({
            visible : true
        });
    }

    closeModalAddProduct = () => {
        this.setState({
            visible : false
        });
    };

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

    render() {
        return(
            <div>
                {this.state.currentUser ? (
                    <button id="add-product-button" type="button" value="Open" onClick={() => this.openModalAddProduct()}>Ajouter un produit </button>
                ) : (
                    <button id="add-product-button" type="button" value="Open" onClick={this.context.openLoginModal}>Ajouter un produit </button>
                )}
                <Modal visible={this.state.visible} width="700" className="modal-popup" effect="fadeInUp" onClickAway={() => this.closeModalAddProduct()}>
                    <div className="modal-style">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModalAddProduct()}/>
                        <h3 className="modal-style-title">Ajoutez un produit</h3>
                        <Create handleProductAdded = {this.props.handleProductAdded} closeModalAddProduct = {this.closeModalAddProduct} />
                    </div>
                </Modal>
            </div>
        );
    }
}

