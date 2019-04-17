import React from 'react';
import Header from '../block/Header'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';

export default class Signin extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Header/>
                <div id="signin">
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string()
                                .required('Le prénom est requis'),
                            lastName: Yup.string()
                                .required('Le nom est requis'),
                            email: Yup.string()
                                .email('L\'addresse email est invalide')
                                .required('L\'email est requis'),
                            password: Yup.string()
                                .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                                .required('Le mot de passe est requis'),
                            confirmPassword:  Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
                                .required('Le mot de passe de confirmation est requis')
                        })}
                        onSubmit={fields => {
                            fetch('http://localhost:8080/users', { method: 'POST', body: JSON.stringify(fields, ['email', 'password'], 4)  })
                                .then((response) => {
                                    return response.json()
                                })
                                .catch(e => {
                                    if (e instanceof SubmissionError) {
                                        throw e;
                                    }
                                });
                        }}
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="firstName">Prénom</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Nom</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="form-btn mr-2">Rejoindre</button>
                                    <button type="reset" className=" btn-secondary form-btn">Réinitialiser</button>
                                </div>
                            </Form>
                        )}
                    />
                </div>
            </div>
        );
    }
}
