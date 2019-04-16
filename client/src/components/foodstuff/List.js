import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/foodstuff/list';
import FoodstuffListItem from './FoodstuffListItem';
import '../../App.scss';
import Header from '../block/Header';
import LeafletMap from "../map/LeafletMap";
import CreateFoodStuffModal from './CreateFoodStuffModal';

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
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleProductAdded = this.handleProductAdded.bind(this);
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

    // Search in list
    filterList(){
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('foodstuff-list-search');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName('li');
  
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h2")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
  
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    handleProductAdded = () => {
        this.props.list(
            this.props.match.params.page &&
            decodeURIComponent(this.props.match.params.page)
        );
        this.setState({
            productUpdated: true
        })
    }

    render() {
        let map = 'Loading';
        if (this.props.retrieved) {
            map = <LeafletMap foodstuffs={this.props.retrieved}/>;
        }
        return (
            <div>
                <Header/>
                <div id="foodstuff-list-and-map-container">
                    <div className="foodstuff-list-container">
                        <div className="foodstuff-list-commands">
                            <CreateFoodStuffModal handleProductAdded = {this.handleProductAdded} />
                            <input type="text" id="foodstuff-list-search" onKeyUp={this.filterList} placeholder="Chercher facilement un produit"/>
                        </div>
                        <ul className="foodstuff-list" id="myUL">
                            {this.props.retrieved &&
                            this.props.retrieved['hydra:member'].map(item => (
                                <FoodstuffListItem item={item} key={item.id} handleProductAdded = {this.handleProductAdded} />
                            ))}
                        </ul>
                        {this.pagination()}
                    </div>
                    <div id="map-container">
                        {map}
                    </div>
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
            <nav aria-label="Page navigation">
                <Link
                    to="."
                    className={`btn btn-primary${previous ? '' : ' disabled'}`}
                >
                    <span aria-hidden="true">&lArr;</span> First
                </Link>
                <Link
                    to={
                        !previous || previous === first ? '.' : encodeURIComponent(previous)
                    }
                    className={`btn btn-primary${previous ? '' : ' disabled'}`}
                >
                    <span aria-hidden="true">&larr;</span> Previous
                </Link>
                <Link
                    to={next ? encodeURIComponent(next) : '#'}
                    className={`btn btn-primary${next ? '' : ' disabled'}`}
                >
                    Next <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                    to={last ? encodeURIComponent(last) : '#'}
                    className={`btn btn-primary${next ? '' : ' disabled'}`}
                >
                    Last <span aria-hidden="true">&rArr;</span>
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