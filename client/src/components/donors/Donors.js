import React from 'react';
import {list} from "../../actions/user/list";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import tablePlaceholderTemplate from '../block/tablePlaceholderTemplate';

export default class Donors extends React.Component {

    constructor(){
        super();
        this.state = {
            donors: null,
        }
    }

    componentDidMount = () => {
        list()
            .then(donors => {
                this.setState({
                    donors: donors
                })
            })
    }

    render() {
        const donorTableRows = this.state.donors &&
            this.state.donors['hydra:member'].map(donor => (
                <tr key={donor['@id']}>
                    <td>{donor.firstName}</td>
                    <td>{donor.points}</td>
                    <td>{donor.grade}</td>
                </tr>
            ))
        ;

        return(
            <div id="dashboard" className="content container">
                    <div className="row">
                        <div className="col-12">
                            <div>
                                <h3 className="page-title">Les donateurs</h3>
                                <ReactPlaceholder showLoadingAnimation customPlaceholder={tablePlaceholderTemplate} ready={this.state.donors}>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Prénom</th>
                                            <th>Points</th>
                                            <th>Grade</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {donorTableRows}
                                        </tbody>
                                    </table>
                                </ReactPlaceholder>             
                            </div>
                        </div>
                    </div>  
            </div>
        );
    }
}
