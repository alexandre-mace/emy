import React from 'react';
import { connect } from 'react-redux';
import {LayoutContext} from "../block/Layout";
import {ENTRYPOINT} from "../../config/entrypoint";
import TakeFoodStuffModal from "./TakeFoodStuffModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import displayLocaleDateString from "../../utils/displayLocaleDateString";
import './ListItem.scss';

library.add(fas)

class FoodstuffListItem extends React.Component {
    static contextType = LayoutContext;
    constructor(){
        super();
        this.state = {
            selected: false
        }
    }

    handleClick = () => {
        let foodstuff = document.getElementsByClassName('foodstuff-' + this.props.item['id'])[0];
        let marker = document.getElementsByClassName('marker-' + this.props.item['id'])[0];
        if (foodstuff.className.includes('selected')) {
            foodstuff.classList.remove('selected');
            if (marker) {
                marker.classList.remove('bounce-infinite');
            }
            this.setState({selected: false});
        } else {
            Array.from(document.getElementsByClassName('foodstuff-list-item')).forEach(function(element) {
                if (element.parentNode.className.includes('selected')) {
                    element.parentNode.classList.remove('selected');
                    const foodstuffId = /[^-]*$/.exec(element.parentNode.className.replace(/ .*/,''))[0];
                    let marker = document.getElementsByClassName('marker-' + foodstuffId)[0];
                    if (marker) {
                        if (marker.className.includes('bounce-infinite')) {
                            marker.classList.remove('bounce-infinite');
                        } else if (marker.className.includes('bounce')){
                            marker.classList.remove('bounce');
                        }
                    }
                }
            });
            foodstuff.classList.add('selected');
            if (marker) {
                marker.classList.add('bounce-infinite');
            }
            this.setState({selected: true});
        }
    }

    render() {
        return(
            <li key={this.props.item['@id']} className={'foodstuff-list-item foodstuff-' + this.props.item['id']} onClick={this.handleClick}>
                {this.props.item.image &&
                    <img src={ENTRYPOINT + '/medias/' + this.props.item.image.contentUrl} className="foodstuff-list-item-image" alt=""/>

                }
                <div className="foodstuff-list-item-description">
                    <h2 className="foodstuff-name">{this.props.item['name']}</h2>
                    <span>
                    <FontAwesomeIcon icon="calendar-alt" className="calendar-img" />
                    <span className="expirationDate">Péremption : {displayLocaleDateString(this.props.item['expirationDate'])}</span>
                    </span>
                    <div className="foodstuff-list-item-button">
                        <TakeFoodStuffModal foodstuff={this.props.item} handleProductTaken={this.props.handleProductTaken}/>
                        <button className="localize-it">
                            <FontAwesomeIcon icon="map-marker-alt" className="marker-img" />
                             Localiser
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodstuffListItem);
