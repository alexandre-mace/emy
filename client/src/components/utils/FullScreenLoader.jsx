import React from 'react';
import './Loader.scss';
import Loader from "./Loader";
import './FullScreenLoader.scss';

export default class FullScreenLoader extends React.Component {
    render() {
        return(
            <div className="row m-auto">
                <div className="col-12 mb-5">
                    <Loader />
                </div>
                <div className="col-12 text-center">
                    <p className="fullscreenLoader-text">Chaque seconde, 41.2 tonnes de nourriture jetées dans le monde</p>
                </div>
            </div>
        );
    }
}