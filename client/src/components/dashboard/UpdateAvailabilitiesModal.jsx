import React from 'react';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import { update } from '../../actions/foodstuff/update';
import { connect } from 'react-redux';

class UpdateAvailabilitiesModal extends React.Component {
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
        return(
            <>
                <button className="form-btn btn-edit" onClick={this.openModal} value={JSON.stringify(this.props.foodstuff)} type="button" name="button">
                    <img alt="modifier" src={require('../../assets/img/edit.png')} />
                </button>
                <Modal width="800" visible={this.state.visible} effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="d-flex flex-column p-5">
                        <img src={require('../../assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>
                        <textarea type="text" value={this.state.value} onChange={this.handleChange}/>
                        <button className="btn form-btn" onClick={this.updateAvailabilities} type="submit" name="button">Modifier</button>
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

