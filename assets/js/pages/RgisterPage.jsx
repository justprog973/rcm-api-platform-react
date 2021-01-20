import { Button } from 'antd';
import UsersAPI from "../services/usersAPI";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/form/Field';

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [loading, setLoading] = useState(false);

    /**
     * Manage champs
     * @param {Object} param0 
     */
    const handleChange =  ( {currentTarget} ) => {
        const {name,value} = currentTarget;
        setUser({ ...user, [name]: value });
    }

    /**
     * Manage of submit
     * @param {Object} event 
     */
    const handleSubmit = async event => {
        event.preventDefault();
        
        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas le même.";
            setErrors(apiErrors);
            return;
        }

        setLoading(true);
        try{
            await UsersAPI.register(user);
            setErrors({});
            history.replace("/login");
            setLoading(false);
        }catch({response}){
            const {violations} = response.data;
            if(violations){
                    violations.forEach( ({propertyPath, message}) => {
                        apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);;
            }
            setLoading(false);
        }
    }

    return ( <>
        <div className="container content">
            <div className="row">
                <div className="col-md-6">
                    <img src="assets/img/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid"/>
                </div>
                <div className="col-md-6 contents">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="mb-4">
                                <h1 className=" text-center font-weight-light font-italic">Inscription </h1>
                                <p className="mb-4">Merci bien de vous inscrire pour utiliser nos service. Vous avez déjà un compte ? <Link to="/login">Connexion</Link> .</p>
                            </div>
                            <form onSubmit={handleSubmit} method="post">
                                <Field 
                                    name="firstName" 
                                    onChange={handleChange} 
                                    label="Prénom" 
                                    value={user.firstName} 
                                    error={errors.firstName}
                                    />
                                <Field 
                                    name="lastName" 
                                    onChange={handleChange} 
                                    label="Nom de famille" 
                                    value={user.lastName}
                                    error={errors.lastName}
                                    />
                                <Field 
                                    name="email" 
                                    onChange={handleChange}
                                    placeholder="Votre adresse email"
                                    type="email"
                                    label="Adresse email" 
                                    value={user.email} 
                                    error={errors.email}
                                    />
                                <Field 
                                    name="password"
                                    type="password" 
                                    onChange={handleChange}
                                    label="Mot de passe" 
                                    value={user.password}
                                    error={errors.password}
                                />
                                <Field 
                                    name="passwordConfirm"
                                    type="password" 
                                    onChange={handleChange}
                                    label="Mot de passe" 
                                    value={user.passwordConfirm}
                                    error={errors.passwordConfirm}
                                />
                                <Button loading={loading} type="primary" htmlType="submit" className="button-custom mt-4" block>S'inscrire</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default RegisterPage;