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
                <div id="dashboard">
                    <h3>Le super dashboard</h3>
                </div>
            </div>
        );
    }
}
