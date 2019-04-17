import React from 'react';
import Header from '../block/Header'

export default class HelpEmy extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Header/>
                <div id="helpEmy" className="content">
                    <h3>Soutenir Emy</h3>
                </div>
            </div>
        );
    }
}
