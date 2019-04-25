import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';

export default class FoodstuffsGivenTable extends React.Component {
    render() {
        const givenTableRows = this.props.foodstuffsGiven &&
            this.props.foodstuffsGiven['hydra:member'].map(foodstuff => (
                <tr key={foodstuff['@id']}>
                    <td>
                        {foodstuff.image &&
                        <img src={ENTRYPOINT + '/medias/' + foodstuff.image.contentUrl} alt=""/>
                        }
                    </td>
                    <td>{foodstuff.name}</td>
                    <td>{foodstuff.expirationDate}</td>
                    <td>{foodstuff.owner.firstName}</td>
                </tr>
            ))
        ;
        return(
            <div className="col-12">
                <div className="product-awaiting">
                    <h3>Vous avez aidé</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Date de péremption</th>
                            <th>Vous attendez sa confirmation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {givenTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}