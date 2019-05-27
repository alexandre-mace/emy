import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';
import UpdateFoodstuffModal from "./UpdateFoodstuffModal";
import displayLocaleDateString from "../../utils/displayLocaleDateString";
import {
    fetch,
} from '../../utils/dataAccess';
import './FoodstuffsToManageTableRow.scss';

export default class FoodstuffsToManageTableRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    deleteFoodstuff = (event) => {
        let foodstuff = JSON.parse(event.target.value);
        fetch(foodstuff['@id'], {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
        })
            .then(response => {
                this.props.handleChange();
            })
            .catch(e => {
                console.log(e)
            });
    };

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

    render() {
        return(
            <tr key={this.props.foodstuff['@id']}>
                <td>
                    {this.props.foodstuff.image && this.props.foodstuff.image.contentUrl &&
                    <img src={ENTRYPOINT + '/medias/' + this.props.foodstuff.image.contentUrl} alt=""/>
                    }
                </td>
                <td>{this.props.foodstuff.name}</td>
                <td>{displayLocaleDateString(this.props.foodstuff.expirationDate)}</td>
                <td>
                    <UpdateFoodstuffModal closeModal={this.closeModal} openModal={this.openModal} visible={this.state.visible} foodstuff={this.props.foodstuff} handleChange={this.props.handleChange} key={this.props.foodstuff['@id']}/>
                    <button className="form-btn btn-delete" onClick={this.deleteFoodstuff} value={JSON.stringify(this.props.foodstuff)} type="button" name="button">
                        <img alt="Supprimer le produit" src={require('../../assets/img/trash.png')} className="img-manage" />
                    </button>
                </td>
            </tr>
        );
    }
}