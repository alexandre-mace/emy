import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Search from '../map/AutoComplete';
import FieldFileInput from '../utils/FieldFileInput';
import TextField from '@material-ui/core/TextField';
import CustomDatePicker from "../utils/CustomDatePicker";

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
                    className="label-d-none"
                >
                    {data.input.name}
                </label>
                <TextField
                    {...data.input}
                    type={data.type}
                    step={data.step}
                    required={data.required}
                    label={data.label}
                    id={`foodstuff_${data.input.name}`}
                    placeholder={data.placeholder}
                    multiline={data.multiline}
                    margin={data.margin}
                    rows={data.rows}
                />
                {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
            </div>
        );
    };
    bindAddress = () => {
        this._reactInternalFiber._debugOwner.stateNode.props.values['address'] = document.getElementById("foodstuff_address").value;
        this._reactInternalFiber._debugOwner.stateNode.props.values['expirationDate'] = document.getElementById("foodstuff_expirationDate").value.replace(/\//g, "-");
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field
                    component={this.renderField}
                    name="name"
                    type="text"
                    label="Nom du produit"
                    required={true}
                />
                <div className="form-group mt-4">
                    <Field
                        component={CustomDatePicker}
                        name="expirationDate"
                        required={true}
                        id="foodstuff_expirationDate"
                        type="date"
                    />
                </div>
                <Field
                    name="address"
                    label="Adresse à laquelle le produit peut être récupéré"
                    type="text"
                    component={Search}
                />
                <Field
                    component={this.renderField}
                    name="phoneNumber"
                    type="text"
                    label="Numéro de téléphone"
                    required={true}
                />
                <Field
                    component={this.renderField}
                    name="availabilities"
                    type="text"
                    label="Vos disponibilités"
                    multiline
                    rows="3"
                />
                <div className="py-4"></div>
                <Field name="image" label="Ajouter une photo du produit" type="file" component={FieldFileInput} />

                <button type="submit" className="btn btn-success form-btn w-100" onClick={this.bindAddress}>
                    AJOUTER LE PRODUIT
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
