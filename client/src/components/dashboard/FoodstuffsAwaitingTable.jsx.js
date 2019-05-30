import React from 'react';
import displayLocaleDateString from "../../utils/displayLocaleDateString";

export default class FoodstuffsAwaitingTable extends React.Component {
    render() {
        const inProgressTableRows = this.props.foodstuffsAwaiting &&
            this.props.foodstuffsAwaiting['hydra:member'].map(offer => (
                <p key={offer['@id']} className="mb-3">
                    Vous avez demandé <span className="important-information">{offer.foodstuff.name}</span> qui expire le <span className="important-information">{displayLocaleDateString(offer.foodstuff.expirationDate)}</span> et attendez la réponse de <span className="important-information">{offer.askingUser.firstName}</span>
                </p>
            ))
        ;
        return(
            <div className="col-12">
                <div className="product-in-progress">
                    <span id="dashboard-page-title">En attente</span>
                    {inProgressTableRows}
                </div>
            </div>
        );
    }
}