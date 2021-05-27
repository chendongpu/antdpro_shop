import React, { useRef,useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Alert, message, Menu, Switch } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getOrders,postOrders} from "../../services/orders";
import Detail from './components/Detail';
import Post from './components/Post';

export default () => {
    const actionRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const isShowModal = (visible) => {
        setIsModalVisible(visible);
    };

    const [isPModalVisible, setIsPModalVisible] = useState(false);

    const isShowPModal = (visible) => {
        setIsPModalVisible(visible);
    };

    const [id, setId] = useState(undefined);

    const status={1:"下单", 2:"支付", 3:"发货" ,4:"收货", 5:"过期"};

    const columns = [

        {
            title: '单号',
            dataIndex: 'order_no',
        },
        {
            title: '用户',
            hideInSearch: true,
            render:(_,record)=>record.user.name
        },
        {
            title: '金额',
            dataIndex: 'amount',
            hideInSearch: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            hideInSearch: true,
            render:(_,record)=><Alert message={status[record.status]} type="success"  />
        },
        {
            title: '支付时间',
            dataIndex: 'pay_time',
            hideInSearch: true
        },

        {
            title: '支付类型',
            dataIndex: 'pay_type',
            hideInSearch: true
        },

        {
            title: '支付单号',
            dataIndex: 'trade_no'
        },
        {
            title: '操作',
            hideInSearch: true,
            render:(_,record)=> {

                return ([<a onClick={() => {
                    isShowModal(true);
                    setId(record.id);
                }
                }>详情</a>,
                record.status===2?<a onClick={() => {
                    isShowPModal(true);
                    setId(record.id);
                }
                }>发货</a>:""]
                )
            }
        }
    ];

    const getData=async (params)=>{
      const response =  await getOrders(params);
      return{
          data:response.data,
          success:true,
          total:response.meta.pagination.total
      }
    };

    const lockData=async (id)=>{
        const response =  await postOrder(id);
        if(response.status===undefined){
            message.success("操作成功");
        }else{
            message.error("操作失败")
        }
    };

    return (
        <PageContainer>
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => getData(params) }

            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={null}
            />
            {isModalVisible?<Detail isModalVisible={isModalVisible} isShowModal={isShowModal}  id={id}/>:""}
            {isPModalVisible?<Post isModalVisible={isPModalVisible} isShowModal={isShowPModal} actionRef={actionRef} id={id}/>:""}
        </PageContainer>
    );
}

