import React, { useRef } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, Space, Menu, Switch } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import request from 'umi-request';
import {getUsers} from "../../services/user";

export default () => {
    const actionRef = useRef();

    const columns = [

        {
            title: '头像',
            dataIndex: 'avatar_url',
            hideInSearch: true,
            render:(_,record)=><Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '是否禁用',
            dataIndex: 'is_locked',
            hideInSearch: true,
            render:(_,record)=><Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                defaultChecked={ record.is_locked===0 }
                onChange={()=>{}}
            />
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            hideInSearch: true
        },
        {
            title: '操作',
            hideInSearch: true,
            render:(_,record)=><a onChange={()=>{}}>编辑</a>
        }
    ];

    const menu = (
        <Menu>
            <Menu.Item key="1">1st item</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
        </Menu>
    );

    const getData=async (params)=>{
      const response =  await getUsers(params);
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
            toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        新建
                    </Button>
                ]
            }
            />
        </PageContainer>
    );
}

