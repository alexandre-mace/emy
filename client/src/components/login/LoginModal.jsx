import React from 'react';
import Modal from 'react-awesome-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../services';
import { TextField } from 'formik-material-ui';
import {
    LinearProgress,
} from '@material-ui/core';

export default class LoginModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Modal visible={this.props.visible} width="600" className="modal-popup" effect="fadeInUp" onClickAway={this.props.closeModal}>
                    <div className="modal-style">
                        <img src={require('../foodstuff/assets/img/close.png')} className="close-popup" alt="Fermer la popup" onClick={this.props.closeModal}/>
                        <h3 className="modal-style-title">Se connecter</h3>
                        <p>Connectez-vous pour ajouter des produits et accéder à votre tableau de bord.</p>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().required('Email is required'),
                                password: Yup.string().required('Password is required')
                            })}
                            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.login(email, password)
                                    .then(
                                        () => {
                                            setSubmitting(false);
                                            this.props.closeModal();
                                            this.props.handleLogin();
                                        },
                                        error => {
                                            setSubmitting(false);
                                            setStatus(error);
                                        }
                                    );
                            }}
                            render={({ errors, status, touched, isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <Field component={TextField} name="email" margin='normal' type="text" label="Votre email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    </div>
                                    <div className="form-group">
                                        <Field component={TextField} name="password" margin='normal' type="password" label="Votre mot de passe" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    </div>
                                    <div className="form-group">
                                        {isSubmitting ? (
                                            <LinearProgress/>
                                        ) : (
                                            <button type="submit" className="form-btn w-100" disabled={isSubmitting}>SE CONNECTER</button>
                                        )}
                                    </div>
                                    {status &&
                                    <div className={'alert alert-danger'}>{this.props.translation(status)}</div>
                                    }
                                </Form>
                            )}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}
