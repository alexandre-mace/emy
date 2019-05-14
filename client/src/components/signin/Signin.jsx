import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';
import { authenticationService } from '../../services';
import { TextField } from 'formik-material-ui';

export default class Signin extends React.Component {
    render() {
        return(
            <div className="content container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="mb-4 text-center">Rejoindre Emy</h1>
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
                            onSubmit={(fields, { setStatus, setSubmitting }) => {
                                setStatus();
                                fetch('http://localhost:8080/users', { method: 'POST', body: JSON.stringify(fields, ['firstName', 'lastName', 'email', 'password'], 4)  })
                                    .then((response) => {
                                        authenticationService.login(fields.email, fields.password)
                                            .then(
                                                user => {
                                                    this.props.history.push('/')
                                                },
                                                error => {
                                                    setSubmitting(false);
                                                    setStatus(error);
                                                }
                                            );
                                    })
                                    .catch(e => {
                                        if (e instanceof SubmissionError) {
                                            throw e;
                                        }
                                    });
                            }}
                            render={({ errors, status, touched, isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <Field component={TextField} label="Prénom" margin="normal" fullWidth name="firstName" type="text" />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Field component={TextField} label="Nom" margin="normal" fullWidth name="lastName" type="text" />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Field component={TextField} label="Email" margin="normal" fullWidth name="email" type="text" />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Field component={TextField} label="Mot de passe" margin="normal" fullWidth name="password" type="password" />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Field component={TextField} label="Confirmez le mot de passe" margin="normal" fullWidth name="confirmPassword" type="password" />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-btn mr-2 w-100">REJOINDRE</button>
                                        {/*<button type="reset" className=" btn-secondary form-btn">Réinitialiser</button>*/}
                                        {isSubmitting &&
                                        <img className="ml-2" alt="loading gif" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                </Form>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
