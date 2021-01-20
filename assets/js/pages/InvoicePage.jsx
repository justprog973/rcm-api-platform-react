import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/form/Field';
import Select from '../components/form/Selecte';
import CustomerAPI from "../services/customersAPI";
import InvoicesAPI from "../services/invoicesAPI";

const InvoicePage = ({history, match}) => {

    const {id = "new"} = match.params;

    const [editing,setEditing]  = useState(false);

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [customers, setCustomers] = useState([]); 

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    /**
     * Récupération des clients
     */
    const fetchCustomers = async () => {
        try{
            const data =  await CustomerAPI.findAll();
            setCustomers(data);
            if(!invoice.customer) setInvoice({...invoice, customer: data[0].id});
        }catch(error){
            history.replace('/invoices');
        }
    }

    /**
     * Récupération d'une facutre
     * @param {int} id 
     */
    const fetchInvoice = async id => {
        try{
            const {amount, status, customer} = await InvoicesAPI.find(id);
            setInvoice({amount, status, customer: customer.id});
        }catch(error){
            history.replace('/invoices');
        }
    }

    /**
     * Récupération de la liste du client au chargement du composant
     */
    useEffect( () => {
        fetchCustomers();
    }, []);

    /**
     * Récupération de la bonne facture en fonction de l'identifiant
     */
    useEffect( () => {
        if(id !== "new"){
            setEditing(true);
            fetchInvoice(id);
        }
    },[id]);
    /**
     * Gestion des changement dans le formulaire
     * @param {Object} param0 
     */
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice,[name] : value});
    }

    /**
     * Gestion de la soumission du formulaire 
     * @param {Object} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(invoice);
        try{
            if(editing){
                await InvoicesAPI.update(id, invoice);
            }else {
                await InvoicesAPI.create(invoice);
                history.replace("/invoices");
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
        }
    }

    return ( <>
        { editing && <h1 className="text-center font-weight-light font-italic" >Modification d'une facture</h1> || <h1 className="text-center font-weight-light font-italic" >Creation d'une facture</h1>}
        <div className="row content content-custom">
                <div className="col-6 contents">
                <form onSubmit={handleSubmit}>
                    <Field 
                        name="amount" 
                        type="number" 
                        placeholder="Montant de al facture" 
                        label="Montant" 
                        onChange={handleChange} 
                        value={invoice.amount}
                        error={errors.amount} />
                    <Select name="customer" label="Montant" value={invoice.customer} error={errors.customer} onChange={handleChange} >
                        {customers.map( customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                    </Select>
                    <Select name="status" label="Statut" value={invoice.status} error={errors.status} onChange={handleChange} >
                        <option value="SENT">Envoyée</option>
                        <option value="PAID">Payée</option>
                        <option value="CANCELLED">Annulée</option>
                    </Select>
                    <div className="form-group">
                        <button type="submit" className="ant-btn ant-btn-primary ant-btn-lg">Enregistrer</button>
                        <Link to="/invoices" className="ant-btn ant-btn-link">Retour à la liste</Link>
                    </div>
                </form>
                </div>
            </div>
    </> );
}
 
export default InvoicePage;