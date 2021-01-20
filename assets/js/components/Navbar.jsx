import { Button, Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';
//import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const Navbar = ({history}) => {
    const { Header } = Layout;
    const { isAuthenticated, setIsAuthenticated : onLogout} = useContext(AuthContext);


    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        history.push("/login");
    }

    return (  
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            {
              isAuthenticated &&
               <>
                <Menu.Item key="1"><NavLink to="/customers" >Clients</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to="/invoices" >Factures</NavLink></Menu.Item>
               </>
            }
            <Menu.Item id="menu_button"  style={ {float:'right', display:'flex',justifyContent:"space-around", alignItems:'center', cursor: "initial"} } disabled>
              <div className="row">
               {
                 !isAuthenticated && <>
                     <div className="col-6">
                        <Button onClick={ () => history.replace('/register') } >Inscription</Button>
                    </div>
                    <div className="col-6">
                        <Button type="primary" onClick={ () => history.replace('/login') } >Connexion</Button>
                    </div>
                 </> ||
                    <div className="col-4">
                      <Button type="danger" onClick={handleLogout} >Déconnexion</Button>
                    </div>
               }
              </div>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
}
 
export default Navbar;