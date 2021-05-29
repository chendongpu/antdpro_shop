import React, { useRef,useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Alert, message, Menu, Switch,Rate,Input } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getComments,replyComments} from "@/services/comments";
import Detail from './components/Detail';
import Reply from './components/Reply';

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

    const rate={1:"好评", 2:"中评", 3:"差评"};

    const columns = [
        {
             title: '商品名',
              hideInTable: true,
              key:'goods_title',
              dataIndex:'goods_title',
              renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
                    return (<Input />) 
              }
          },
        {
            title: '内容',
            hideInSearch: true,
            dataIndex: 'content',
        },
        {
            title: '级别: ',
            dataIndex: 'rate',
            valueType:'radioButton',
            valueEnum:{
                1:{text:'好评'},
                2:{text:'中评'},
                3:{text:'差评'}
            },
            render:(_,record)=><Alert message={rate[record.rate]} type="success"  />
        },
        {
            title: '星级',
            dataIndex: 'star',
            hideInSearch: true,
            render:(_,record)=>{
                return <Rate disabled defaultValue={record.star} />
            }            
        },
          {
            title: '回复',
            dataIndex: 'reply',
            hideInSearch: true
        },
        {
            title: '添加时间',
            dataIndex: 'created_at',
            hideInSearch: true
        },
        {
            title: '操作',
            hideInSearch: true,
            render:(_,record)=> {

                return ([<a onClick={() => {
                    isShowModal(true);
                    setId(record.id);
                }
                }>详情</a>,<a onClick={() => {
                    isShowPModal(true);
                    setId(record.id);
                }
                }>回复</a>]
                )
            }
        }
    ];

    const getData=async (params)=>{
      const response =  await getComments(params);
      return{
          data:response.data,
          success:true,
          total:response.meta.pagination.total
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
            {isPModalVisible?<Reply isModalVisible={isPModalVisible} isShowModal={isShowPModal} actionRef={actionRef} id={id}/>:""}
        </PageContainer>
    );
}

