import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';
import {fetch} from "../../utils/dataAccess";
import UpdateAvailabilitiesModal from "./UpdateAvailabilitiesModal";

export default class FoodstuffsToManageTable extends React.Component {

    delete = (event) => {
        let foodstuff = JSON.parse(event.target.value);
        fetch(foodstuff['@id'], {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
        })
            .then(response => {
                this.props.handleChange();
            })
    };

    updateAvailabilities = (event) => {
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
        const manageTableRows = this.props.foodstuffsToManage &&
            this.props.foodstuffsToManage['hydra:member'].map(foodstuff => (
                <tr key={foodstuff['@id']}>
                    <td>
                        {foodstuff.image &&
                        <img src={ENTRYPOINT + '/medias/' + foodstuff.image.contentUrl} alt=""/>
                        }
                    </td>
                    <td>{foodstuff.name}</td>
                    <td>{foodstuff.expirationDate}</td>
                    <td>{foodstuff.availabilities}
                         <br/>
                        <UpdateAvailabilitiesModal foodstuff={foodstuff} refreshTable={this.props.handleChange}/>
                     </td>
                    <td>
                        <button className="form-btn" onClick={this.delete} value={JSON.stringify(foodstuff)} type="button" name="button">Supprimer le produit</button>
                    </td>
                </tr>
            ))
        ;
        return(
            <div className="col-12">
                <div className="">
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Date de péremption</th>
                            <th>Modifier les disponibilitées</th>
                            <th>Supprimer le produit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {manageTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}