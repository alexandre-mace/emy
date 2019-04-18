import React from 'react';
import Header from '../block/Header'

export default class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Header/>
                <div id="dashboard" className="content">
                    <h3>Le super dashboard</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <section className="dashboard-main-section mt-3">
                        <div className="product-taken mr-3">
                            <table>
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Nom</th>
                                    <th>Date de péremption</th>
                                    <th>Vous avez aidé</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="product-given ml-3">
                            <table>
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Nom</th>
                                    <th>Date de péremption</th>
                                    <th>Elle avez aidé</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                <tr>
                                    <td><img src="" alt=""/></td>
                                    <td>Produit de test</td>
                                    <td>09 février, 2022</td>
                                    <td>Gaetan</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
