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
                <div id="partner" className="content container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="page-title">Les super partenaires</h3>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                        <div className="col-md-3">
                            <img src="https://thumbs.gfycat.com/BiodegradableGiganticBass-poster.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
