import { Button } from 'antd';

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/form/Field';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';

const LoginPage = ({history}) => {

    const { setIsAuthenticated : onLogin} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username : "",
        password : ""
    });
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    
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
        setLoading(true);
        try{
            await AuthAPI.authenticate(credentials);
            setError("");
            onLogin(true);
            history.replace("/customers");
        }catch(error){
            console.log(error.response);
            setLoading(false);
            setError("Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !");
        }
    }

    return (
        <div className="container content">
            <div className="row">
                <div className="col-md-6">
                    <img src="assets/img/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid"/>
                </div>
                <div className="col-md-6 contents">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="mb-4">
                                <h1 className=" text-center font-weight-light font-italic">Connexion </h1>
                                <p className="mb-4">Merci bien de vous connecter pour utiliser nos service. Vous aves pas de compte ? <Link to="/register">Inscription</Link>  .</p>
                            </div>
                            <form onSubmit={handleSubmit} method="post">
                                <div className="form-custom">
                                    <Field 
                                        name="username" 
                                        onChange={handleChange} 
                                        className="first" 
                                        label="Adresse email" 
                                        value={credentials.username} 
                                        error={error}
                                    />
                                    <Field 
                                        name="password"
                                        type="password" 
                                        onChange={handleChange} 
                                        className="last" 
                                        label="Mot de passe" 
                                        value={credentials.password}
                                    />
                                </div>
                                <Button loading={loading} type="primary" htmlType="submit" className="button-custom mt-4" block>Se connecter</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default LoginPage;