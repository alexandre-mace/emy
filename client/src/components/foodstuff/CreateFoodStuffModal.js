import React from 'react';
import Modal from 'react-awesome-modal';
import Create from './Create';
import { authenticationService } from '../../services';

export default class CreateFoodStuffModal extends React.Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            visible: false,
            currentUser: null
        }
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
    }

    componentDidMount() {
        this._isMounted = true;
        authenticationService.currentUser.subscribe(x => {
            if (this._isMounted) {
                this.setState({currentUser: x})
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div>
                {this.state.currentUser ? (
                    <button id="add-product-button" type="button" value="Open" onClick={() => this.openModalAddProduct()}>Ajouter un produit </button>
                ) : (
                    <button id="add-product-button" type="button" value="Open" onClick={this.props.openModal}>Connectez vous pour ajouter un produit </button>
                )}
                <Modal visible={this.state.visible} width="700" className="modal-popup" effect="fadeInUp" onClickAway={() => this.closeModalAddProduct()}>
                    <div className="modal-style">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModalAddProduct()}/>
                        <h3 className="modal-style-title">Ajoutez un produit !</h3>
                        <Create handleProductAdded = {this.props.handleProductAdded} closeModalAddProduct = {this.closeModalAddProduct} />
                    </div>
                </Modal>
            </div>
        );
    }
}

