import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';
import {fetch} from "../../utils/dataAccess";
import displayLocaleDateString from "../../utils/displayLocaleDateString";

export default class FoodstuffsToConfirmTable extends React.Component {
    hasBeenTaken = (event) => {
        let foodstuff = JSON.parse(event.target.value);
        fetch(foodstuff['@id'], {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
            body: JSON.stringify({ isAwaiting:false, hasBeenGiven: true, owner: foodstuff.askingToOwn['@id'] })
        })
            .then(response => {
                this.props.handleChange();
            })
    };

    render() {
        const confirmTableRows = this.props.foodstuffsToConfirm &&
            this.props.foodstuffsToConfirm['hydra:member'].map(foodstuff => (
                <tr key={foodstuff['@id']}>
                    <td>
                        {foodstuff.image &&
                        <img src={ENTRYPOINT + '/medias/' + foodstuff.image.contentUrl} alt=""/>
                        }
                    </td>
                    <td>{foodstuff.name}</td>
                    <td>{displayLocaleDateString(foodstuff.expirationDate)}</td>
                    <td>{foodstuff.owner.firstName}</td>
                    <td>
                        <button className="form-btn" onClick={this.hasBeenTaken} value={JSON.stringify(foodstuff)} type="button" name="button">Je confirme que ce produit a été pris</button>
                    </td>
                </tr>
            ))
        ;
        return(
            <div className="col-12">
                <div className="product-to-confirm">
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Date de péremption</th>
                            <th>Il/Elle a besoin de vous</th>
                            <th>Confirmer la demande</th>
                        </tr>
                        </thead>
                        <tbody>
                        {confirmTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}