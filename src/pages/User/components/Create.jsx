import React, { useRef,useState } from 'react';
import { message,Modal } from 'antd';
import {addUser} from "@/services/user";
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Create=(props)=>{

	const {isModalVisible,isShowModal,actionRef}=props;

	const createUser =async (values) => {
	        const response =  await addUser(values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 return  (
	 	<Modal title="添加用户" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	                <ProForm onFinish={(values)=>{createUser(values)}}>
	                    <ProFormText name="name" label="昵称" placeholder="请输入昵称" rules={[{required:true,message:"请输入昵称"}]} />
	                    <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required:true,message:"请输入邮箱"},{type:'email',message:"邮箱格式不正确"},]} />
	                    <ProFormText.Password name="password" label="密码" placeholder="请输入密码" rules={[{required:true,message:"请输入密码"},{min:6,message:"密码最小6位"},]} />
	                </ProForm>
	            </Modal>
	            );
}
export default Create;