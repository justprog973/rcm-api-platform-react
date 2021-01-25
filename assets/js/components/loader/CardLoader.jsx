import React from 'react';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Button, Card, Skeleton } from 'antd';

const CardLoader = ({loading}) => {

    return ( 
        <>
           <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
            <div className="col-xl-4 col-md-6 col-12 mb-3">
                <Card
                    style={{ width: "100%" }}
                    bordered={false}
                    >
                    <Skeleton loading={loading}  paragraph={{ rows: 3 }}/>
                </Card>
            </div>
        </>
     );
}
 
export default CardLoader;