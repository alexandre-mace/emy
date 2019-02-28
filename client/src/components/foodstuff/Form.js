import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Search from '../map/AutoComplete';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>
        <label
          htmlFor={`foodstuff_${data.input.name}`}
          className="form-control-label"
        >
          {data.input.name}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`foodstuff_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };
  bindAddressInput() {
      let autocompleteInput = document.getElementById("form_address_autocomplete");
      let addressInput = document.getElementById("foodstuff_address");
      addressInput.value = autocompleteInput.value;
      alert(addressInput.value);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>

        <label>Nom du produit :</label>
        <Field
          component={this.renderField}
          name="name"
          type="text"
          placeholder=""
          required={true}
        />

        <label>Date de péremption :</label>
        <Field
          component={this.renderField}
          name="expirationDate"
          type="date"
          placeholder=""
          required={true}
        />

        <label>Saisissez votre adresse :</label>
        <Search/>
          <Field
              component={this.renderField}
              name="address"
              type="text"
              placeholder=""
              required={true}
          />
        <label className="label-phone">Votre téléphone :</label>
        <Field
          component={this.renderField}
          name="phoneNumber"
          type="text"
          placeholder=""
          required={true}
        />

        <label>Vos disponibilités :</label>
        <Field
          component={this.renderField}
          name="availabilities"
          type="text"
          placeholder=""
        />

        <label>Insérer votre image :</label>
        <Field
          component={this.renderField}
          name="image"
          type="text"
          placeholder=""
        />

        <button type="submit" className="btn btn-success btn-form" onClick={this.bindAddressInput}>
          Ajouter le produit !
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'foodstuff',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
