import { DeleteOutlined, EditOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import PaginationCustom from '../components/PaginationCustom';
import customersAPI from '../services/customersAPI';

const { Meta } = Card;
const { Search } = Input;

const CustomersPage = props => {

    const [customers,setCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    /**
     * Get all customers in API 
     */
    const fetchCustomer = async () => {
        try{
            const data = await customersAPI.findAll();
            setCustomer(data);
        } catch( error ){
            console.log(error.response);
        }
    }
    
    /**
     * to loading of component go to search the customers
     */
    useEffect(() => fetchCustomer() , []);

    /**
     * Manage the delete the customer
     * @param { int } id 
     */
    const handleDelete = async id =>{

        const orginalCustomers = [...customers];
        setCustomer(customers.filter(customer => customer.id !== id));

        try {
            await customersAPI.delete(id);
        }catch(error){
            setCustomer(orginalCustomers);
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

    const itemsPerpage = 6;

    /**
     * filter the customers in function of the serach
     */
    const filteredCustomer = customers.filter( 
        c => 
            c.firstName.toLowerCase().includes(search.toLowerCase()) || 
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())   ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )

    /**
     * Paginated the data
     */
    const paginatedCustomer = PaginationCustom.getData(
        filteredCustomer,
        currentPage, 
        itemsPerpage
    );

    return ( <>
                <h1>Liste des client</h1>
                <div className="row mb-4">
                    <div className="col-4">
                        <Search value={search} onChange={handleSearch} placeholder="input search text" size="middle" 
                                enterButton={<Button loading={!filteredCustomer.length} icon={<SearchOutlined />} />} />
                    </div>
                </div>
                <div className="row">
                    {
                        paginatedCustomer.map( customer => 
                                <div className="col-4 mb-3" key={customer.id}>
                                    <Card
                                    style={{ width: 300 }}
                                    actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <Button disabled={customer.invoices.length > 0} onClick={() => handleDelete(customer.id)}  
                                    icon={<DeleteOutlined key="ellipsis" />} shape="circle" danger/>
                                    ]}
                                    title={`${customer.firstName} ${customer.lastName}`}
                                    extra={<span className="badge badge-secondary p-2">{customer.invoices.length} </span>}
                                >
                                    <Meta
                                        title="Informations "
                                        description={descriptionCard(customer)}
                                    />
                                </Card>
                                </div>
                                )
                    }
                </div>
                {
                    itemsPerpage < filteredCustomer.length &&
                    <PaginationCustom currentPage={currentPage} length={filteredCustomer.length} onPageChange={handlePageChange} />
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