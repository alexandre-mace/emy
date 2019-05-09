import React from 'react';
import Modal from 'react-awesome-modal';
import { authenticationService } from '../../services';
import {LayoutContext} from "../block/Layout";
import {ENTRYPOINT} from "../../config/entrypoint";
import PropTypes from 'prop-types';
import { update } from '../../actions/foodstuff/update';
import { connect } from 'react-redux';

class UpdateAvailabilitiesModal extends React.Component {
    static contextType = LayoutContext;
    static propTypes = {
        update: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            value: this.props.foodstuff.availabilities
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    openModal = () => {
        this.setState({
            visible : true
        });
    }

    closeModal = () => {
        this.setState({
            visible : false
        });
    }

    updateAvailabilities = () => {
        this.props.update(this.props.foodstuff, { availabilities: this.state.value })
            .then(() => {
                this.props.refreshTable();
                this.closeModal();
            });
    };

    render() {
        console.log(this.props.foodstuff)
        return(
            <>
                <button className="form-btn btn-edit" onClick={this.openModal} value={JSON.stringify(this.props.foodstuff)} type="button" name="button">
                    <img src={require('../../assets/img/edit.png')} />
                </button>
                <Modal width="800" visible={this.state.visible} effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="modal-style">
                        <img src={require('../../assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>
                        <div className="modal-take-it-foodstuff-description">
                            <div className="d-flex flex-column m-4">
                                <h4 className="modal-take-it-foodstuff-name">{this.props.foodstuff['name']}</h4>
                                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                                <button className="btn form-btn" onClick={this.updateAvailabilities} type="submit" name="button">Modifier</button>
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
)(UpdateAvailabilitiesModal);

