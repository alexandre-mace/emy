import React from 'react';
import {list} from "../../actions/user/list";
import Loader from "../utils/Loader";

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
                {this.state.donors ? (
                    <div className="row">
                        <div className="col-12">
                            <div>
                                <h3 className="page-title">Les donateurs</h3>
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
                            </div>
                        </div>
                    </div>                    ) : (
                    <div className="row mt-5">
                        <div className="col">
                            <Loader />
                        </div>
                    </div>
                )}

            </div>
        );
    }
}
