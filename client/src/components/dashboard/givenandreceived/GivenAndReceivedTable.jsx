import React from 'react';

export default class GivenAndReceivedTable extends React.Component {

    render() {
        const tableRows = this.props.foodstuffs &&
            this.props.foodstuffs.map(foodstuff => (
                <div key={Math.random().toString(16).slice(2)} className="mb-3">
                    {(() => {
                        switch(true) {
                            case foodstuff.provider['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.hasBeenGiven:
                                return <p>Grâce à vous, <span className="important-information">{foodstuff.owner.firstName}</span> à reçu <span className="important-information">{foodstuff.name}</span></p>;
                            case foodstuff.owner['@id'] === JSON.parse(localStorage.getItem('currentUser'))['@id'] && foodstuff.hasBeenGiven:
                                return <p>Grâce à <span className="important-information">{foodstuff.provider.firstName}</span>, vous avez à reçu <span className="important-information">{foodstuff.name}</span></p>;
                            default:
                                return null;
                        }
                    })()}
                </div>
            ))
        ;
        return(
            <div className="col-12">
                <span id="dashboard-page-title">Donnés et reçus</span>
                {tableRows}
            </div>
        );
    }
}