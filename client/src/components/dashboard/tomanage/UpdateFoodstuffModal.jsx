import React from 'react';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import { update } from '../../../actions/foodstuff/update';
import { connect } from 'react-redux';
import Update from '../../foodstuff/Update'
import './UpdateFoodstuffModal.scss';

class UpdateFoodstuffModal extends React.Component {
    static propTypes = {
        update: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
        };
    }

    updateFoodstuffDataTransformer = (foodstuff) => {
        let owner = {};
        if (foodstuff.owner) {
            owner = { owner: foodstuff.owner['@id'] };
        }
        let provider = {}
        if (foodstuff.provider) {
            provider = { provider: foodstuff.provider['@id'] };
        }
        let image = {}
        if (foodstuff.image) {
            image = { image: foodstuff.image['@id'] };
        }
        return Object.assign(foodstuff, owner, provider, image)
    }
    render() {
        return(
            <>
                <button onClick={this.props.openModal} value={JSON.stringify(this.props.foodstuff)}  className="form-btn btn-edit" type="button" name="button">
                    <img alt="Modifier le produit" src={require('../../../assets/img/edit-white.png')} className="img-manage" />
                </button>
                <div className="update-foodstuff-modal">
                    <Modal width="800" visible={this.props.visible} effect="fadeInUp" onClickAway={this.props.closeModal}>
                        <div className="modal-style">
                            <img src={require('../../../assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={this.props.closeModal}/>
                            <h3 className="modal-style-title">Modifier votre produit</h3>
                            <Update
                                closeModal={this.props.closeModal}
                                initialValues={this.updateFoodstuffDataTransformer(this.props.foodstuff)}
                                handleChange={this.props.handleChange}
                                id={this.props.foodstuff['@id']}
                                form={this.props.foodstuff['@id']}
                            />
                        </div>
                    </Modal>
                </div>
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
)(UpdateFoodstuffModal);

