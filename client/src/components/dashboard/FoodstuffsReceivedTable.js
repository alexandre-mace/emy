import React from 'react';
import { ENTRYPOINT } from '../../config/entrypoint';

export default class FoodstuffsReceivedTable extends React.Component {
    render() {
        const receivedTableRows = this.props.foodstuffsReceived &&
            this.props.foodstuffsReceived['hydra:member'].map(foodstuff => (
                <tr key={foodstuff['@id']}>
                    <td>
                        {foodstuff.image &&
                        <img src={ENTRYPOINT + '/medias/' + foodstuff.image.contentUrl} alt=""/>
                        }
                    </td>
                    <td>{foodstuff.name}</td>
                    <td>{foodstuff.expirationDate}</td>
                    <td>{foodstuff.provider.firstName}</td>
                </tr>
            ))
        ;
        return(
            <div className="col-12">
                <div className="product-awaiting">
                    <h3>Vous avez été aidé</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Date de péremption</th>
                            <th>Il/Elle vous a aidé</th>
                        </tr>
                        </thead>
                        <tbody>
                        {receivedTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}