import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/form/Field';
import CustomersAPI from '../services/customersAPI';

const CustomerPage = ({match, history}) => {

    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company:""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [loading, setLoading] = useState(false);
    
    const [editing,setEditing]  = useState(false);
    
    /**
     * Recuperation du cutomers en fonction de l'id
     * @param {int} id 
     */
    const fetchCustomer = async id => {
        const regexId= /^\d+$/;
        
        if(regexId.test(id)){
            try{
                const {firstName, lastName, email, company} = await CustomersAPI.find(id);
                setCustomer({firstName, lastName, email, company});
            }catch(error){
                console.log(error.response);
                toast.error("Erreur lord du chargement du client ! ");
                history.replace("/customers");
            }
        }
    }

    /**
     * Chargement du customer si besoin au chargement du composant ou au changement de l'id
     */
    useEffect( () => {
        if(id !== "new") {
            setEditing(true)
            fetchCustomer(id);
        };
    },[id]);

    /**
     * Gestion des changement dans le formulaire
     * @param {Object} param0 
     */
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer,[name] : value});
    }

    /**
     * Gestion de la soumition du formulaire
     * @param {Object} event 
     */
    const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true);
        try{
            setErrors({});
            
           if(editing){
                await CustomersAPI.update(id, customer);
                toast.success("Le client a bien été modifié !");
                setLoading(false);
           }else {
                await CustomersAPI.create(customer);
                toast.success("Le client a bien été créer !");
                history.replace("/customers");
                setLoading(false);
           }
        }catch({ response }){
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                    violations.forEach( ({propertyPath, message}) => {
                        apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            setLoading(false);
            toast.error("Vous avez des erreurs ! ");
        }

    }

    return ( 
        <>
            { !editing && <h1 className="text-center font-weight-light font-italic" >Créer un client </h1> || <h1 className="text-center" >Modification du client </h1>}

            <div className="row content content-custom">
                <div className="col-6 contents">
                <form onSubmit={handleSubmit}>
                    <Field 
                        value={customer.lastName} 
                        error={errors.lastName} 
                        onChange={handleChange}  
                        name='lastName' label="Nom de famille" 
                        placeholder="Nom de famille du client" 
                        className="first"/>
                    <Field 
                        value={customer.firstName}
                        error={errors.firstName} 
                        onChange={handleChange}  
                        name='firstName' 
                        label="Prénom" 
                        placeholder="Prénom du client" />
                    <Field 
                        value={customer.email} 
                        error={errors.email} 
                        onChange={handleChange}  
                        name='email' 
                        label="Adresse email" 
                        placeholde="Adresse email du client" 
                        type="email" />
                    <Field 
                        value={customer.company} 
                        error={errors.company} 
                        onChange={handleChange}  
                        name='company' 
                        label="Entreprise" 
                        placeholde="Entreprise du client"
                        className="last"/>
                    <div className="form-group">
                        <Button loading={loading} type="primary" htmlType="submit" className="button-custom">{ editing ? "Modifier" : "Enregistrer" }</Button>
                        <Link to="/customers" className="ant-btn ant-btn-link">Retour à la liste</Link>
                    </div>
                </form>
                </div>
            </div>
        </>
     );
}
 
export default CustomerPage;