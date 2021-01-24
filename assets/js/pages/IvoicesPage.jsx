import { DeleteOutlined, EditOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Input } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginationCustom from '../components/PaginationCustom';
import invoicesAPI from '../services/invoicesAPI';

const { Meta } = Card;
const { Search } = Input;

const STATUS_CLASSES = {
    PAID : "success",
    SENT : "dark",
    CANCELLED : "danger"
}

const STATUS_LABELS = {
    PAID : "Payée",
    SENT : "Envoyée",
    CANCELLED : "Annulée"
}

 /**
     * Get all invoices in API 
     */
const InvoicesPage = ({history}) => {
    
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    
    
    const fetchInvoices = async () => {
        
        try{
            const data = await invoicesAPI.findAll();
            setInvoices(data);
        }catch(error){
            toast.error("Erreur lors du chargement des factures !");
        }
    };

    useEffect(() => fetchInvoices() ,[]);

    /**
     * return formated date
     * @param {String} str 
     */
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    /**
     * Returns the informations of invoice
     * @param {Object} invoice 
     */
    const descriptionCard = invoice => {
        return <div className="ddescription_custom">
                   <span className="badge badge-light p-2 mb-2">
                        {formatDate(invoices.sentAt)}
                   </span>
                   <span className="badge badge-info p-2 float-right" style={{ color : "#fff" }}>
                         {invoice.amount.toLocaleString()}  &euro;
                   </span><br/>
                    <span className={"badge p-2 badge-" + STATUS_CLASSES[invoice.status]}>
                        {STATUS_LABELS[invoice.status]}
                    </span>
               </div>
    }

    /**
     * filter the invoices in function of the serach
     */
    const filteredInvoices = invoices.filter( 
        i => 
            i.customer.firstName.toLowerCase().includes(search.toLowerCase())   || 
            i.customer.lastName.toLowerCase().includes(search.toLowerCase())    ||
            i.amount.toString().toLowerCase().startsWith(search.toLowerCase())    ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

    /**
     * Manage the  search bar 
     * @param { Object } event 
     */
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    /**
     * Manage the page change
     * @param { int } page 
     */
    const handlePageChange = page => setCurrentPage(page);

    const itemsPerPage =9;

    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter( invoice => invoice.id !== id ));
        try{
           await invoicesAPI.delete(id);
           toast.success(`La facture n°${id} à bien été supprimé !`);
        }catch(error){
            console.log(error.response);
            toast.error(`Une erreur est survenue !`);
            setInvoices(originalInvoices);
        }
    }

    /**
     * Paginated the data
     */
    const paginatedInvoices = PaginationCustom.getData(
        filteredInvoices,
        currentPage, 
        itemsPerPage
    );

    return (  
        <>
        <div className="d-flex justify-content-between align-items-center">
            <h1> List des factures</h1>
            <Link to="/invoices/new" className="ant-btn ant-btn-primary ant-btn-lg">Créer une facture</Link>
        </div>

            <div className="row mb-4">
                    <div className="col-4">
                        <Search value={search} onChange={handleSearch} placeholder="input search text" size="middle" 
                                enterButton={<Button loading={!filteredInvoices.length} icon={<SearchOutlined />} />} />
                    </div>
            </div>
            <div className="row">
                        {
                            paginatedInvoices.map( invoice => 
                                    <div className="col-4 mb-3" key={invoice.id}>
                                        <Card
                                        style={{ width: 300 }}
                                        actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" onClick={ () => history.replace(`/invoices/${invoice.id}`) } />,
                                        <Button
                                        onClick={() => handleDelete(invoice.id)}   
                                        icon={<DeleteOutlined key="ellipsis" />} shape="circle" danger/>
                                        ]}
                                        title={`${invoice.customer.firstName} ${invoice.customer.lastName}`}
                                        extra={<span className="badge badge-secondary p-2">{invoice.chrono} </span>}
                                    >
                                        <Meta
                                            title="Informations "
                                            description={descriptionCard(invoice)}
                                        />
                                    </Card>
                                    </div>
                                    )
                        }
            </div>
                {
                    itemsPerPage < filteredInvoices.length &&
                    <PaginationCustom currentPage={currentPage} length={filteredInvoices.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange}/>
                }
        </>
    );
}
 
export default InvoicesPage;