import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';
import {
    fetch,
} from '../../utils/dataAccess';
import displayLocaleDateString from "../../utils/displayLocaleDateString";

export default class FoodstuffsTable extends React.Component {

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
        const confirmTableRows = this.props.foodstuffs &&
            this.props.foodstuffs.map(foodstuff => (
                <tr key={Math.random().toString(16).slice(2)}>
                    <td>
                        {foodstuff.image &&
                        <img src={ENTRYPOINT + '/medias/' + foodstuff.image.contentUrl} alt=""/>
                        }
                    </td>
                    <td>{foodstuff.name}</td>
                    <td>{displayLocaleDateString(foodstuff.expirationDate)}</td>
                    <td>
                        {(() => {
                            switch(true) {
                                case foodstuff.provider['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.isAwaiting:
                                    return <p>il vous attend : {foodstuff.askingToOwn.firstName}</p>;
                                case foodstuff.askingToOwn['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.isAwaiting:
                                    return <p>vous attendez : {foodstuff.provider.firstName}</p>;
                                case foodstuff.provider['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.hasBeenGiven:
                                    return <p>vous avez aidé : {foodstuff.owner.firstName}</p>;
                                case foodstuff.owner['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.hasBeenGiven:
                                    return <p>il vous a aidé : {foodstuff.provider.firstName}</p>;
                                default:
                                    return null;
                            }
                        })()}
                        </td>
                    <td>
                        {(() => {
                            switch(true) {
                                case foodstuff.provider['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.isAwaiting:
                                    return <button className="form-btn" onClick={this.hasBeenTaken} value={JSON.stringify(foodstuff)} type="button" name="button">Je confirme que ce produit a été pris</button>;
                                case foodstuff.askingToOwn['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.isAwaiting:
                                    return <span>En attente</span>;
                                case foodstuff.provider['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.hasBeenGiven:
                                    return <span>Donné</span>;
                                case foodstuff.owner['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.hasBeenGiven:
                                    return <span>Reçu</span>;
                                default:
                                    return null;
                            }
                        })()}
                    </td>
                </tr>
            ))
        ;
        return(
            <div className="col-12">
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Date de péremption</th>
                        <th>Contact</th>
                        <th>Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                        {confirmTableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}