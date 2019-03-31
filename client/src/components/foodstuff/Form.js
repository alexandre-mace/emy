import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Search from '../map/AutoComplete';
import FieldFileInput from './FieldFileInput';

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
    bindAddress = () => {
        this._reactInternalFiber._debugOwner.stateNode.props.values['address'] = document.getElementById("foodstuff_address").value;
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
                <label>Adresse à laquelle le produit peut être récupéré :</label>
                <Field
                    name="address"
                    label="address"
                    type="text"
                    component={Search}
                />
                <label className="label-phone">Numéro de téléphone :</label>
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
                <Field name="image" label="Ajouter une photo du produit" type="file" component={FieldFileInput} />

                <button type="submit" className="btn btn-success btn-form" onClick={this.bindAddress}>
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
