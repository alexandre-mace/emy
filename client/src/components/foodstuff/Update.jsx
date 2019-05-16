import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/foodstuff/update';
import { del } from '../../actions/foodstuff/delete';
import {
    LinearProgress,
} from '@material-ui/core';

class Update extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    retrieveLoading: PropTypes.bool.isRequired,
    retrieveError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };
  constructor(){
      super();
      this.state = {
      }
  }

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  componentDidUpdate(prevProps) {
      if (JSON.stringify(this.props.updated) !== JSON.stringify(prevProps.updated)) {
          this.props.closeModal();
          this.props.handleChange();
      }
  }

  render() {
    if (this.props.deleted) return <Redirect to="/tableau-de-bord/gerer-vos-produits" />;
    const item = this.props.initialValues;

    return (
      <div>
        {/*{this.props.created && (*/}
          {/*<div className="alert alert-success" role="status">*/}
            {/*{this.props.created['@id']} created.*/}
          {/*</div>*/}
        {/*)}*/}
        {/*{this.props.updated && (*/}
          {/*<div className="alert alert-success" role="status">*/}
            {/*{this.props.updated['@id']} updated.*/}
          {/*</div>*/}
        {/*)}*/}
        {(this.props.retrieveLoading ||
          this.props.updateLoading ||
          this.props.deleteLoading) && (
            <LinearProgress/>
        )}
        {this.props.retrieveError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.retrieveError}
          </div>
        )}
        {this.props.updateError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.updateError}
          </div>
        )}
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
          </div>
        )}

        {item && (
          <Form
            form={this.props.form}
            onSubmit={values => this.props.update(item, values)}
            initialValues={item}
            submitWording="MODIFIER VOTRE PRODUIT"
          />
        )}
        {/*<Link to=".." className="btn btn-primary">*/}
          {/*Back to list*/}
        {/*</Link>*/}
        {/*<button onClick={this.del} className="btn btn-danger">*/}
          {/*Delete*/}
        {/*</button>*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  retrieved: state.foodstuff.update.retrieved,
  retrieveError: state.foodstuff.update.retrieveError,
  retrieveLoading: state.foodstuff.update.retrieveLoading,
  updateError: state.foodstuff.update.updateError,
  updateLoading: state.foodstuff.update.updateLoading,
  deleteError: state.foodstuff.del.error,
  deleteLoading: state.foodstuff.del.loading,
  eventSource: state.foodstuff.update.eventSource,
  created: state.foodstuff.create.created,
  deleted: state.foodstuff.del.deleted,
  updated: state.foodstuff.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => dispatch(update(item, values)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
