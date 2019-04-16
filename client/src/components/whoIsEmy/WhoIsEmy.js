import React from 'react';
import Header from '../block/Header'

export default class WhoIsEmy extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Header/>
                <div id="who-is-emy">
                    <h3>Emy, c'est vous</h3>
                </div>
            </div>
        );
    }
}
