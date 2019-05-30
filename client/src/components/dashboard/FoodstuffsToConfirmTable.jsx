import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import {fetch} from "../../utils/dataAccess";
import displayLocaleDateString from "../../utils/displayLocaleDateString";
import {LayoutContext} from "../block/Layout";

export default class FoodstuffsToConfirmTable extends React.Component {
    static contextType = LayoutContext;

    acceptOffer = (offer) => {
        fetch(offer['@id'], {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
            body: JSON.stringify({ status: 'accepted' })
        })
            .then(() => {
                fetch(offer.foodstuff['@id'], {
                    method: 'PUT',
                    headers: new Headers({ 'Content-Type': 'application/ld+json' }),
                    body: JSON.stringify({ isAwaiting: true })
                })
            })
            .then(() => {
                Alert.success('Vous venez d\'accepter une demande, échangez avec l\{autre personne dans la catégorie \'en cours\'.', {
                    position: 'bottom-right',
                    effect: 'slide',
                    timeout: 5000,
                    offset: 10
                });
                this.props.handleChange();
            })
    };

    declineOffer = (offer) => {
        fetch(offer['@id'], {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
            body: JSON.stringify({ status: 'declined' })
        })
            .then(() => {
                Alert.success('Nous vous confirmons que vous avez refusé une demande.', {
                    position: 'bottom-right',
                    effect: 'slide',
                    timeout: 5000,
                    offset: 10
                });
                this.props.handleChange();
            })
    };

    hasBeenSeen = (offer) => {
        if (offer && offer.hasBeenSeen === false) {
            fetch(offer['@id'], {
                method: 'PUT',
                headers: new Headers({ 'Content-Type': 'application/ld+json' }),
                body: JSON.stringify({ hasBeenSeen:true })
            })
                .then(() => {
                    this.props.handleChange();
                    this.context.handleChange();
                })
        }
    }

    render() {
        const confirmTableRows = this.props.foodstuffsToConfirm &&
            this.props.foodstuffsToConfirm['hydra:member'].map(offer => (
                <div key={offer['@id']}
                    onMouseOver={() => this.hasBeenSeen(offer)}
                    className={
                        (offer.hasBeenSeen === false) ? 'has-not-been-seen' : ''
                    }
                >
                    <p><span className="important-information">{offer.askingUser.firstName}</span> aimerait obtenir <span className="important-information">{offer.foodstuff.name}</span> qui expire le <span className="important-information">{displayLocaleDateString(offer.foodstuff.expirationDate)}</span></p>
                    <div>
                        <button className="form-btn btn-success" onClick={() => this.acceptOffer(offer)} type="button" name="button">Accepter</button>
                        <button className="ml-2 form-btn btn-danger" onClick={() => this.declineOffer(offer)} type="button" name="button">Refuser</button>
                    </div>
                </div>
            ))
        ;
        return(
            <div className="col-12">
                <div className="product-to-confirm">
                    <span id="dashboard-page-title">À confirmer</span>
                    {confirmTableRows}
                </div>
            </div>
        );
    }
}