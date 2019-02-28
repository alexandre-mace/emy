import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/foodstuff/list';
import Create from './Create';
import Modal from 'react-awesome-modal';
import MapContainer from '../map/MapContainer';
import ListItem from './ListItem';
import '../../App.css';
import Header from '../block/Header';

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
            visible: false,
            visibleAddProduct: false,
            file: null
        }

        this.handleChange = this.handleChange.bind(this)

    }


    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    openModalAddProduct() {
        this.setState({
            visibleAddProduct : true
        });
    }

    closeModalAddProduct() {
        this.setState({
            visibleAddProduct : false
        });
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
        input = document.getElementById('filterListInput');
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

    render() {
        let mapContainer;
        if (this.props.retrieved) {
            mapContainer = <div id="map"><MapContainer foodstuffs={this.props.retrieved}/></div>;
        } else {
            mapContainer = '';
        }

        return (
            <div>
                <Header/>
                <div id="list-map-wrapper">
                    <div className="foodstuff-list-wrapper">
                        <div className="foodstuff-list-commands">
                            <button type="button" value="Open" onClick={() => this.openModalAddProduct()}>Ajouter un produit </button>
                            <input type="text" id="filterListInput" onKeyUp={this.filterList} placeholder="Chercher facilement un produit !"/>
                        </div>
                        <ul className="foodstuff-list" id="myUL">
                            {this.props.retrieved &&
                            this.props.retrieved['hydra:member'].map(item => (
                                <ListItem item={item} key={item.id}/>
                            ))}
                        </ul>
                        {this.pagination()}
                    </div>
                    {mapContainer}
                </div>
                <Modal visible={this.state.visibleAddProduct} width="400" className="modal-popup" effect="fadeInUp" onClickAway={() => this.closeModalAddProduct()}>
                    <div className="popup-takeit">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModalAddProduct()}/>
                        <h3>Ajouter un produit !</h3>
                        <Create/>
                    </div>
                </Modal>
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