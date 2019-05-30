import React from 'react';
import ToManageTableRow from "./ToManageTableRow.jsx";

export default class ToManageTable extends React.Component {
    render() {
        return(
            <div className="col-12">
                <div className="">
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Date de péremption</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.foodstuffs &&
                            this.props.foodstuffs['hydra:member'].map((foodstuff, i) => (
                                <ToManageTableRow foodstuff={foodstuff} key={i} handleChange={this.props.handleChange} />
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}