import React, { useRef,useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, message, Menu, Switch } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getCategory} from "@/services/category";
import CreateOrEdit from './components/CreateOrEdit';

export default () => {
    const actionRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const isShowModal = (visible) => {
        setIsModalVisible(visible);
    };

    const [id, setId] = useState(undefined);

    const columns = [

        {
            title: '分类',
            dataIndex: 'name',
        },
        {
            title: '操作',
            hideInSearch: true,
            render:(_,record)=><a onClick={()=>{
                    isShowModal(true);
                    setId(record.id);
                }
            }>编辑</a>
        }
    ];

    const getData=async (params)=>{
      const response =  await getCategory(params);
      return{
          data:response,
          success:true
      }
    };

    return (
        <PageContainer>
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => getData(params) }

            rowKey="id"
            search={false}
            pagination={false}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>{isShowModal(true);setId(undefined);}} >
                        新建
                    </Button>
                ]
            }
            />
            {isModalVisible?<CreateOrEdit isModalVisible={isModalVisible} isShowModal={isShowModal} actionRef={actionRef} id={id}/>:""}
        </PageContainer>
    );
}

