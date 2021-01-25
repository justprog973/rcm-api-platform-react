import { PageHeader, Menu, Tabs, Button, Tag, Typography, Row  } from 'antd';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';
//import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const Navbar = ({history}) => {
    const { TabPane } = Tabs;
    const { isAuthenticated, setIsAuthenticated : onLogout} = useContext(AuthContext);


    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        toast.info("Vous désormais déconnecté !");
        history.push("/login");
    }

    const extraButton = (isAuthenticated) => {
        if(!isAuthenticated) {
          return [
            <Button  size="large" type="link" key="1" onClick={( () => { history.replace("/register") })}>Inscription</Button>,
            <Button size="large"  type="primary" key="2" onClick={( () => { history.replace("/login") })}>Connexion</Button>
          ] 
        }else{
          return <Button size="large" type="danger" onClick={handleLogout} >Déconnexion</Button>
        }
    }

    return (  
            <>
              <PageHeader
                  title="Title"
                  className="site-page-header"
                  subTitle="This is a subtitle"
                  tags={<Tag color="blue">Running</Tag>}
                  extra={extraButton(isAuthenticated)}
                  avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                >
              </PageHeader>
              <nav className="navbar navbar-expand-lg p-0 navbar-dark bg-dark darker">
                <div className="container">
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink exact to={'/'} className="nav-link">Home</NavLink>
                      </li>
                     {
                       isAuthenticated && <>
                      <li className="nav-item">
                        <NavLink to={'/customers'} className="nav-link">Clients</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={'/invoices'} className="nav-link">Factures</NavLink>
                      </li>
                       </>
                     }
                    </ul>
                  </div>
                </div>
              </nav>
            </>
      );
    }
    
    export default Navbar;
    
    
    
    
    
    
    
    
    // <Layout>
    //   <Header className="header">
    //     <div className="logo" />
    //     <Menu theme="dark" mode="horizontal">
    //       {
    //         isAuthenticated &&
    //          <>
    //           <Menu.Item key="1"><NavLink to="/customers" >Clients</NavLink></Menu.Item>
    //           <Menu.Item key="2"><NavLink to="/invoices" >Factures</NavLink></Menu.Item>
    //          </>
    //       }
    //       <Menu.Item id="menu_button"  style={ {float:'right', display:'flex',justifyContent:"space-around", alignItems:'center', cursor: "initial"} } disabled>
    //         <div className="row">
    //          {
    //            !isAuthenticated && <>
    //                <div className="col-6">
    //                   <Button onClick={ () => history.replace('/register') } >Inscription</Button>
    //               </div>
    //               <div className="col-6">
    //                   <Button type="primary" onClick={ () => history.replace('/login') } >Connexion</Button>
    //               </div>
    //            </> ||
    //               <div className="col-4">
    //                 <Button type="danger" onClick={handleLogout} >Déconnexion</Button>
    //               </div>
    //          }
    //         </div>
    //       </Menu.Item>
    //     </Menu>
    //   </Header>
    // </Layout>