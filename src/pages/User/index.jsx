import React, { useRef,useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, message, Menu, Switch,Modal } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import request from 'umi-request';
import {getUsers,lockUser} from "../../services/user";
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
    const actionRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleForm =async (value) => {
        const res=await add(value);

        if(res.code===0){
            props.dispatch({
                type:'todo/getTodoList',
                payload:null
            });
            message.success(res.message);
        }else{
            message.error("error");
        }

    };


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
                onChange={()=>{lockData(record.id)}}
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

    const lockData=async (uid)=>{
        const response =  await lockUser(uid);
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
            toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={showModal}>
                        新建
                    </Button>
                ]
            }
            />
            <Modal title="添加用户" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <ProForm onFinish={(value)=>{handleForm(value)}}>
                    <ProFormText name="name" label="昵称" placeholder="请输入昵称" rules={[{required:true,message:"请输入昵称"}]} />
                    <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required:true,message:"请输入邮箱"},{type:'email',message:"邮箱格式不正确"},]} />
                    <ProFormText.Password name="password" label="密码" placeholder="请输入密码" rules={[{required:true,message:"请输入密码"},{min:6,message:"密码最小6位"},]} />
                </ProForm>
            </Modal>
        </PageContainer>
    );
}

