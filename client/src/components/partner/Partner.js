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
                <div id="partner" className="content">
                    <h3>Les super partenaires</h3>
                </div>
            </div>
        );
    }
}
