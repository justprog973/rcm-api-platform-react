import React from 'react';
import { Layout, Menu } from 'antd';
import { Button } from 'antd';
//import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const Navbar = (props) => {
    const { Header } = Layout;
    return (  
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Clients</Menu.Item>
            <Menu.Item key="2">Factures</Menu.Item>
            <Menu.Item id="menu_button"  style={ {float:'right', display:'flex',justifyContent:"space-around", alignItems:'center', cursor: "initial"} } disabled>
              <div className="row">
                <div className="col-4">
                  <Button>Inscription</Button>
                </div>
                <div className="col-4">
                  <Button type="primary">Connexion</Button>
                </div>
                <div className="col-4">
                  <Button type="danger">Déconnexion</Button>
                </div>
              </div>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
}
 
export default Navbar;