import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/foodstuff/list';
import Create from './Create';
import logo from './assets/img/logo-emy.png';
import Modal from 'react-awesome-modal';
import MapContainer from './map/MapContainer';
import './App.css';


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
      input = document.getElementById('myInput');
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
    return (
      <div>
        <header>
          <img src={logo} className="logo" alt="Logo Emy" />
          <nav>

              <ul>
                  <li><a href="#">Accueil</a></li>
                  <li><a href="#">À propos</a></li>
                  <li><a href="#">Partenaires</a></li>
                  <li><a href="#">S inscrire</a></li>
                  <li><a href="#">Se connecter</a></li>
              </ul>
          </nav>
        </header>

{/* 
        {this.props.loading && (
          <div className="alert alert-info">Loading...</div>
        )}
        {this.props.deletedItem && (
          <div className="alert alert-success">
            {this.props.deletedItem['@id']} deleted.
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
        )}

        <p>
          <Link to="create" className="btn btn-primary">
            Create
          </Link>
        </p> */}



      <div id="wrapper">
        
        <div className="list-map">
          <div className="search-list">
            <button type="button" className="addproduct" value="Open" onClick={() => this.openModalAddProduct()}>Ajouter un produit </button>

        <input type="text" id="myInput" onKeyUp={this.filterList} placeholder="Chercher facilement un produit !"/>

          </div>

        
        <ul className="ul-list-map" id="myUL">
            {this.props.retrieved &&
              this.props.retrieved['hydra:member'].map(item => (

              <li key={item['@id']}>

                <img src={require('./assets/img/1.jpg')} className="img-produit" alt=""/>

              <div className="ctn-desc-item">
                  <h2>{item['name']}</h2>
                  
                  <span>
                  <img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/>
                      DDP : <span>{item['expirationDate']}</span>
                  </span>

                  <a className="take-it-infos" value="Open" onClick={() => this.openModal()}>Je prends !</a>
                  <a href="">
                  <img src={require('./assets/img/place-localizer.png')} className="img-calendar" alt=""/>
                  Localiser
                  </a>
              </div>

                <Modal visible={this.state.visible} width="400" className="modal-popup modal-popup2" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="popup-takeit">
                        <img src={require('./assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={() => this.closeModal()}/>

                        <h3>Planifier le rendez-vous !</h3>

                        <div className="side-product-popup">
                        <img src={require('./assets/img/1.jpg')} className="img-produit" alt=""/>
                          <span>
                            <h4>{item['name']}</h4>
                            <p>
                                <img src={require('./assets/img/calendar.png')} className="img-calendar" alt=""/>
                                DDP : <span>{item['expirationDate']}</span>
                            </p>
                            <button type="button" name="button">{item['phoneNumber']}</button>
                          </span>
                        </div>

                    </div>
                </Modal>
              </li>

              ))}
              </ul>

        {this.pagination()}
        </div>

        <div id="map">

         <MapContainer/>          

        </div>
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