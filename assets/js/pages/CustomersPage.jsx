import { DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Input, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardLoader from '../components/loader/CardLoader';
import PaginationCustom from '../components/PaginationCustom';
import customersAPI from '../services/customersAPI';

const { Meta } = Card;
const { Search } = Input;

const CustomersPage = ({history}) => {

    const [customers,setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Get all customers in API 
     */
    const fetchCustomer = async () => {
        setLoading(true);
        try{
            const data = await customersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch( error ){
            toast.error("Erreur lors du chargement des clients !");
            setLoading(false);
        }
    }
    
    /**
     * to loading of component go to search the customers
     */
    useEffect(() => fetchCustomer() , []);

    /**
     * Manage the delete of customer
     * @param { int } id 
     */
    const handleDelete = async id =>{

        const orginalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await customersAPI.delete(id);
            toast.success(`Le client n°${id} à bien été suprimé !`);
        }catch(error){
            setCustomers(orginalCustomers);
            toast.error(`Erreur lors de la suppression du client !`);
        }
    }

    const descriptionCard = customer => {
        return <div className="ddescription_custom">
                   <span className="badge badge-light p-2 mb-2">
                        {customer.email}
                   </span>
                   <span className="badge badge-info p-2 float-right" style={{ color : "#fff" }}>
                         {customer.totalAmount.toLocaleString()}  &euro;
                   </span><br/>
                   @Company {customer.company}
               </div>
    }
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

    const itemsPerPage = 9;

    /**
     * filter the customers in function of the serach
     */
    const filteredCustomers = customers.filter( 
        c => 
            c.firstName.toLowerCase().includes(search.toLowerCase()) || 
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())   ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )

    /**
     * Paginated the data
     */
    const paginatedCustomers = PaginationCustom.getData(
        filteredCustomers,
        currentPage, 
        itemsPerPage
    );

    return ( <>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Liste des client</h1>
                    <Link to="/customers/new" className="ant-btn ant-btn-primary ant-btn-lg centered-icon">Ajouter un client</Link>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <Search value={search} onChange={handleSearch} placeholder="input search text" size="large" 
                                enterButton={<Button loading={loading} icon={<SearchOutlined />} />} />
                    </div>
                </div>
                <div className="row">
                    {
                        paginatedCustomers.map( customer => 
                                <div className="col-xl-4 col-md-6 col-12 mb-3" key={customer.id}>
                                    <Card
                                    style={{ width: '100%' }}
                                    bordered={false}
                                    actions={[
                                    <Button type="primary" shape="circle" icon={<EditOutlined key="edit"/>} onClick={() => { history.replace(`/customers/${customer.id}`)}} />,
                                    <Button disabled={customer.invoices.length > 0} onClick={() => handleDelete(customer.id)}  
                                    icon={<DeleteOutlined key="ellipsis" />} shape="circle" danger/>
                                    ]}
                                    title={`${customer.firstName} ${customer.lastName}`}
                                    extra={<span className="badge badge-secondary p-2">{customer.invoices.length} </span>}
                                    >
                                    
                                    <Skeleton loading={loading} >
                                    <Meta
                                        title="Informations"
                                        description={descriptionCard(customer)}
                                    />
                                    </Skeleton>
                                </Card>
                                </div>
                                )
                    }
                    {loading && <CardLoader loading={loading} />}
                </div>
                {
                    itemsPerPage < filteredCustomers.length &&
                    <PaginationCustom currentPage={currentPage} length={filteredCustomers.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
                }
            </>);
}
 
export default CustomersPage;







 {/* <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomer.map( customer => 
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                                <td>{customer.email} </td>
                                <td>{customer.company} </td>
                                <td className="text-center"><span className="badge badge-primary p-2">{customer.invoices.length} </span></td>
                                <td className="text-center">{customer.totalAmount.toLocaleString()}  &euro;</td>
                                <td>
                                    <Button onClick={() => handleDelete(customer.id)} 
                                    disabled={ customer.invoices.length > 0} 
                                    type="danger" shape="round" size="middle" >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                    )}
                </tbody>
            </table> */}