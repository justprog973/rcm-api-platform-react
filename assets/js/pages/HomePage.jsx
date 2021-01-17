import React from 'react';
import { Button } from 'antd';

const HomePage = (props) => {
    return ( 
        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4"/>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <Button type="primary" shape="round" size="large" >Learn More</Button>
            </p>
        </div>
     );
}
 
export default HomePage;