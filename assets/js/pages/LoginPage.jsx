import { Alert } from 'antd';
//import $ from 'jquery';
import React, {useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';

const LoginPage = ({history}) => {

    const { setIsAuthenticated : onLogin} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username : "",
        password : ""
    });

    const [error, setError] = useState("");

    useEffect(()=>{
        // $('.form-control').on('input', function() {
        //     var $field = $(this).closest('.form-group');
        //     if (this.value) {
        //       $field.addClass('field--not-empty');
        //     } else {
        //       $field.removeClass('field--not-empty');
        //     }
        //   });
    },[]);
    
    /**
     * Manage champs
     * @param {Object} param0 
     */
    const handleChange =  ( {currentTarget} ) => {
        const {name,value} = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    }

    /**
     * Manage of submit
     * @param {Object} event 
     */
    const handleSubmit = async event => {
        event.preventDefault();
        try{
            await AuthAPI.authenticate(credentials);
            setError("");
            onLogin(true);
            history.replace("/customers");
        }catch(error){
            console.log(error.response);
            setError("Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !");
        }
    }

    return (<div className="container content">
            <div className="row">
                <div className="col-md-6">
                    <img src="assets/img/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid"/>
                </div>
                <div className="col-md-6 contents">
                    <div className="row justify-content-center">
                   { error && <div className="col-8 mb-2">
                                <Alert
                                    message="Error"
                                    description={error}
                                    type="error"
                                    showIcon
                                    />
                            </div>
                    }
                        <div className="col-md-8">
                            <div className="mb-4">
                                <h3>Connexion </h3>
                                <p className="mb-4">Merci bien de vous connecter pour utiliser nos service. Vous aves pas de compte ? <a href="#">Inscription</a> .</p>
                            </div>
                            <form onSubmit={handleSubmit} method="post">
                                <div className="form-group first">
                                    <label htmlFor="username">Adresse email</label>
                                    <input value={credentials.username} onChange={handleChange} type="text" className="form-control" name="username"/>
                                </div>
                                <div className="form-group last mb-4">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input value={credentials.password} onChange={handleChange} type="password" className="form-control" name="password"/>
                                </div>
                                {/* <div className="d-flex mb-5 align-items-center">
                                    <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                    <input type="checkbox" checked="checked" onClick={ () => { console.log('ok') }}/>
                                <div className="control__indicator"></div>
                                </label>
                                <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                </div> */}
                                <button type="submit" className="btn btn-block btn-primary">Se connecter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
 
export default LoginPage;