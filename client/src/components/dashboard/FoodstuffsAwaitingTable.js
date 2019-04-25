import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';

export default class FoodstuffsAwaitingTable extends React.Component {
    render() {
        const awaitingTableRows = this.props.foodstuffsAwaiting &&
            this.props.foodstuffsAwaiting['hydra:member'].map(foodstuff => (
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
                    <h3>Vous avez demandé</h3>
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
                        {awaitingTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}