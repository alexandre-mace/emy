import React from 'react';
import {fetch} from "../../utils/dataAccess";
import displayLocaleDateString from "../../utils/displayLocaleDateString";
import {LayoutContext} from "../block/Layout";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class FoodstuffsInProgressTable extends React.Component {
    static contextType = LayoutContext;

    hasBeenGiven = (offer) => {
        fetch(offer['@id'], {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
            body: JSON.stringify({ status: 'ended' })
        })
            .then(() => {
                fetch(offer.foodstuff['@id'], {
                    method: 'PUT',
                    headers: new Headers({ 'Content-Type': 'application/ld+json' }),
                    body: JSON.stringify({ isAwaiting: false, hasBeenGiven: true, owner: offer.askingUser['@id'] })
                })
            })
            .then(() => {
                Alert.success('Vous venez de confirmez avec succès la bonne reception du produit, félicitations, c\'est grâce à vous que le monde sera meilleur demain.', {
                    position: 'bottom-right',
                    effect: 'slide',
                    timeout: 5000,
                    offset: 10
                });
                this.props.handleChange();
            })
    };

    hasNotBeenGiven = (offer) => {
        fetch(offer['@id'], {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/ld+json' }),
            body: JSON.stringify({ status: 'ended' })
        })
            .then(() => {
                fetch(offer.foodstuff['@id'], {
                    method: 'PUT',
                    headers: new Headers({ 'Content-Type': 'application/ld+json' }),
                    body: JSON.stringify({ isAwaiting: false })
                })
            })
            .then(() => {
                Alert.success('Vous venez de confirmez que le produit n\'a pas été récupéré, il est déjà remis sur Emy.', {
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
        const inProgressTableRows = this.props.foodstuffsInProgress &&
            this.props.foodstuffsInProgress['hydra:member'].map(offer => (
                <div key={offer['@id']} className="d-flex flex-column mb-4">
                    <p>
                        <span className="important-information">{offer.askingUser.firstName}</span> a demandé d'obtenir <span className="important-information">{offer.foodstuff.name}</span> qui expire le <span className="important-information">{displayLocaleDateString(offer.foodstuff.expirationDate)} </span> et vous avez accepté
                    </p>
                    <div>
                        <button className="form-btn btn-success" onClick={() => this.hasBeenGiven(offer)} type="button" name="button">Ce produit a été récupéré</button>
                        <button className="ml-2 form-btn btn-danger" onClick={() => this.hasNotBeenGiven(offer)} type="button" name="button">Ce produit n'a pas été récupéré</button>
                    </div>
                </div>
            ))
        ;
        return(
            <div className="col-12">
                <div className="product-in-progress">
                    <span id="dashboard-page-title">En cours</span>
                    {inProgressTableRows}
                </div>
            </div>
        );
    }
}