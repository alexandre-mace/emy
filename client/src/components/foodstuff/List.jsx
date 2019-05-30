import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/foodstuff/list';
import FoodstuffListItem from './FoodstuffListItem.jsx';
import LeafletMap from "../map/LeafletMap.jsx";
import CreateFoodStuffModal from './CreateFoodStuffModal.jsx';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Loader from "../utils/Loader.jsx";
import foodstuffListPlaceholderTemplate from "../block/foodstuffListPlaceholderTemplate.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import './List.scss';

class List extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        eventSource: PropTypes.instanceOf(EventSource),
        deletedItem: PropTypes.object,
        list: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };
    constructor(){
        super();
        this.state = {
            foodstuffListUpdated: false,
        }
        this.handleProductAdded = this.handleProductAdded.bind(this);
        this.handleProductTaken = this.handleProductTaken.bind(this);
    }

    componentDidMount() {
        this.props.list(
            this.props.match.params.page &&
            decodeURIComponent(this.props.match.params.page)
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.page !== nextProps.match.params.page)
            nextProps.list(
                nextProps.match.params.page &&
                decodeURIComponent(nextProps.match.params.page)
            );
    }

    componentWillUnmount() {
        this.props.reset(this.props.eventSource);
    }

    handleProductAdded = () => {
        Alert.success('Génial, votre produit vient tout juste d\'être ajouté !', {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 5000,
            offset: 10
        });
        this.props.list(
            this.props.match.params.page &&
            decodeURIComponent(this.props.match.params.page)
        );
        this.setState({
            foodstuffListUpdated: true
        })
    }

    handleProductTaken = () => {
        Alert.success('Génial, vous venez de demander un produit, le propriétaire en sera notifié !', {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 5000,
            offset: 10
        });
        this.props.list(
            this.props.match.params.page &&
            decodeURIComponent(this.props.match.params.page)
        );
        this.setState({
            foodstuffListUpdated: true
        })
    };

    render() {
        return (
                <div id="foodstuff-list-and-map-container">
                    <div className="foodstuff-list-container">
                        <div className="foodstuff-list-commands">
                            <CreateFoodStuffModal handleProductAdded = {this.handleProductAdded} />
                        </div>
                        <ul id="foodstuff-list">
                            <ReactPlaceholder showLoadingAnimation customPlaceholder={foodstuffListPlaceholderTemplate} ready={this.props.retrieved !== null}>
                                <React.Fragment>
                                    {this.props.retrieved &&
                                        this.props.retrieved['hydra:member'].map(item => (
                                            <FoodstuffListItem item={item} key={item.id} handleProductTaken = {this.handleProductTaken} />
                                        ))
                                    }
                                </React.Fragment>
                            </ReactPlaceholder>
                            {this.pagination()}
                        </ul>
                    </div>
                    <div id="map-container">
                        {this.props.retrieved ? (
                            <LeafletMap foodstuffs={this.props.retrieved}/>
                        ) : (
                            <div className="d-flex">
                                <div className="m-auto">
                                    <Loader />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    pagination() {
        const view = this.props.retrieved && this.props.retrieved['hydra:view'];
        if (!view) return;

        const {
            'hydra:first': first,
            'hydra:previous': previous,
            'hydra:next': next,
            'hydra:last': last
        } = view;

        return (
            <nav className="foodstuff-pagination mt-auto" aria-label="Page navigation">
                <Link
                    to="."
                    className={`btn btn-primary${previous ? '' : ' disabled'}`}
                >
                    <span aria-hidden="true">&lArr;</span>
                </Link>
                <Link
                    to={
                        !previous || previous === first ? '.' : encodeURIComponent(previous)
                    }
                    className={`btn btn-primary${previous ? '' : ' disabled'}`}
                >
                    <span aria-hidden="true">&larr;</span>
                </Link>
                <Link
                    to={next ? encodeURIComponent(next) : '#'}
                    className={`btn btn-primary${next ? '' : ' disabled'}`}
                >
                    <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                    to={last ? encodeURIComponent(last) : '#'}
                    className={`btn btn-primary${next ? '' : ' disabled'}`}
                >
                    <span aria-hidden="true">&rArr;</span>
                </Link>
            </nav>
        );
    }

    renderLinks = (type, items) => {
        if (Array.isArray(items)) {
            return items.map((item, i) => (
                <div key={i}>{this.renderLinks(type, item)}</div>
            ));
        }

        return (
            <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
        );
    };
}

const mapStateToProps = state => {
    const {
        retrieved,
        loading,
        error,
        eventSource,
        deletedItem
    } = state.foodstuff.list;
    return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);