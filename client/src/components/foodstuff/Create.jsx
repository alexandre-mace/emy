import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/foodstuff/create';
import {
    LinearProgress,
} from '@material-ui/core';

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };
    constructor(){
        super();
        this.state = {
        }
    }

  componentWillUnmount() {
    this.props.reset();
  }
  componentDidUpdate(prevProps) {
      if (JSON.stringify(this.props.created) !== JSON.stringify(prevProps.created)) {
          this.props.handleProductAdded();
          this.props.closeModalAddProduct();
      }
  }

  render() {
      return (
      <div>
        {this.props.loading &&
            <LinearProgress/>
        }
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}

        <Form onSubmit={this.props.create} values={this.props.item} submitWording="AJOUTER LE PRODUIT"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.foodstuff.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
