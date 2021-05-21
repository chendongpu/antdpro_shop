import React, { useState,useEffect } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import {history} from "umi";
import {fetchDashboard} from "../../services/dashboard";


const DashBoard = () => {
    const [data,setData]=useState({});


    useEffect(async ()=>{
        let resData=await fetchDashboard();
        setData(resData);
    },[]);

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="用户数"
                            value={data.users_count}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="商品数"
                            value={data.goods_count}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card>
                        <Statistic
                            title="订单数"
                            value={data.order_count}
                            valueStyle={{ color: '#234abc' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )

};
export default DashBoard;