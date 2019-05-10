import React from 'react';
import { connect } from 'react-redux';
import {LayoutContext} from "../block/Layout";
import {getOne} from "../../actions/image/getOne";
import {ENTRYPOINT} from "../../config/entrypoint";
import TakeFoodStuffModal from "./TakeFoodStuffModal";

class FoodstuffListItem extends React.Component {
    static contextType = LayoutContext;
    constructor(){
        super();
        this.state = {
            selected: false,
            image: '',
        }
    }

    componentDidMount() {
        if (this.props.item.image) {
            getOne(this.props.item.image)
                .then(image => {
                    this.setState({
                        image: image.contentUrl
                    })
                })
        }
    }

    handleClick = () => {
        let foodstuff = document.getElementsByClassName('foodstuff-' + this.props.item['id'])[0];
        let marker = document.getElementsByClassName('marker-' + this.props.item['id'])[0];
        if (foodstuff.className.includes('selected')) {
            foodstuff.classList.remove('selected');
            marker.classList.remove('bounce-infinite');
            this.setState({selected: false});
        } else {
            Array.from(document.getElementsByClassName('foodstuff-list-item')).forEach(function(element) {
                if (element.parentNode.className.includes('selected')) {
                    element.parentNode.classList.remove('selected');
                    const foodstuffId = /[^-]*$/.exec(element.parentNode.className.replace(/ .*/,''))[0];
                    let marker = document.getElementsByClassName('marker-' + foodstuffId)[0];
                    if (marker.className.includes('bounce-infinite')) {
                        marker.classList.remove('bounce-infinite');
                    } else if (marker.className.includes('bounce')){
                        marker.classList.remove('bounce');
                    }
                }
            });
            foodstuff.classList.add('selected');
            marker.classList.add('bounce-infinite');
            this.setState({selected: true});
        }
    }

    render() {
        return(
            <li key={this.props.item['@id']} className={'foodstuff-' + this.props.item['id']}>
                <div className="foodstuff-list-item" onClick={this.handleClick}>
                    {this.state.image &&
                        <img src={ENTRYPOINT + '/medias/' + this.state.image} className="foodstuff-list-item-image" alt=""/>
                    }
                    <div className="foodstuff-list-item-description">
                        <h2 className="foodstuff-name">{this.props.item['name']}</h2>
                        <span>
                        <img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/>
                        <span className="expirationDate">DDP : {this.props.item['expirationDate']}</span>
                        </span>
                        <div className="foodstuff-list-item-button">
                            <TakeFoodStuffModal image={this.state.image} foodstuff={this.props.item} handleProductTaken={this.props.handleProductTaken}/>
                            <button className="localize-it">
                                <img src={require('./assets/img/place-localizer.png')} className="img-calendar" alt=""/>
                                Localiser
                            </button>
                        </div>
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
