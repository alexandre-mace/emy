import React from 'react';
import Modal from 'react-awesome-modal';
import Create from './Create';

export default class CreateFoodStuffModal extends React.Component {
    constructor(){
        super();
        this.state = {
            visible: false
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

    render() {
        return(
            <div>
                <button id="add-product-button" type="button" value="Open" onClick={() => this.openModalAddProduct()}>Ajouter un produit </button>
                <Modal visible={this.state.visible} width="400" className="modal-popup" effect="fadeInUp" onClickAway={() => this.closeModalAddProduct()}>
                    <div className="popup-takeit">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModalAddProduct()}/>
                        <h3>Ajoutez un produit !</h3>
                        <Create handleProductAdded = {this.props.handleProductAdded} closeModalAddProduct = {this.closeModalAddProduct} />
                    </div>
                </Modal>
            </div>
        );
    }
}

