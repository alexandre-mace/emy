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
                    <section>
                        <p>Les produits que vous avez partagé avec Emy</p>
                        <ul>
                            <li></li>
                        </ul>
                    </section>
                    <section>
                        <p>Les produits que vous avez obtenus grâce à Emy</p>
                        <ul>
                            <li></li>
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
}
