import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Search from '../map/AutoComplete';
import FieldFileInput from '../utils/FieldFileInput';
import TextField from '@material-ui/core/TextField';
import CustomDatePicker from "../utils/CustomDatePicker";
import displayLocaleDateString from "../../utils/displayLocaleDateString";

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
                    id={this.props.initialValues
                        ? `foodstuff_${data.input.name}-${this.props.initialValues.id}`
                        : `foodstuff_${data.input.name}`
                        }
                    placeholder={data.placeholder}
                    multiline={data.multiline}
                    margin={data.margin}
                    rows={data.rows}
                />
                {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
            </div>
        );
    };

    componentDidMount() {
        this.props.change('expirationDate', displayLocaleDateString(new Date()).replace(/\//g, "-"));
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
                        name="expirationDate"
                        component={props => <CustomDatePicker
                            onChange={date => this.props.change('expirationDate', date)}
                            required={true}
                            id={this.props.initialValues
                                ? `foodstuff_expirationDate-${this.props.initialValues.id}`
                                : 'foodstuff_expirationDate'
                            }
                            initialValue={this.props.initialValues
                                ? this.props.initialValues.expirationDate
                                : new Date()
                            }
                        />}
                    />
                </div>
                <Field
                    name="address"
                    label="Adresse à laquelle le produit peut être récupéré"
                    type="text"
                    component={props => <Search {...props} onChange={address => this.props.change('address', address)} />}
                    id={this.props.initialValues
                        ? `foodstuff_address-${this.props.initialValues.id}`
                        : 'foodstuff_address'
                    }
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
                <Field
                    name="image"
                    label="Ajouter une photo du produit"
                    type="file"
                    id={this.props.initialValues
                        ? `foodstuff_file-${this.props.initialValues.id}`
                        : 'foodstuff_file'
                    }
                    component={FieldFileInput}
                />

                <button
                    type="submit"
                    className="btn btn-success form-btn w-100"
                >
                    {this.props.submitWording}
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
