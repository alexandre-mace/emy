import React from 'react';
import FoodstuffsToManageTableRow from "./FoodstuffsToManageTableRow";

export default class FoodstuffsToManageTable extends React.Component {
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
                            {this.props.foodstuffsToManage &&
                            this.props.foodstuffsToManage['hydra:member'].map((foodstuff, i) => (
                                <FoodstuffsToManageTableRow foodstuff={foodstuff} key={i} handleChange={this.props.handleChange} />
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}