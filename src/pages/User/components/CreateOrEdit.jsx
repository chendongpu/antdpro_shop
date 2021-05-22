import React, { useEffect,useState } from 'react';
import { message,Modal ,Skeleton} from 'antd';
import {addUser,updateUser,getUser} from "@/services/user";
import ProForm, { ProFormText } from '@ant-design/pro-form';

const CreateOrEdit=(props)=>{

	const [initialValues, setInitialValues] = useState(undefined);

	const {isModalVisible,isShowModal,actionRef,uid}=props;

	useEffect(async ()=>{
		if(uid!=undefined){
			const response =  await getUser(uid);
		        if(response.status===undefined){
		        	setInitialValues({name:response.name,email:response.email,});
		        }
		}		
	},[]);

	const EditUser =async (values) => {
	        const response =  await updateUser(uid,values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 const createUser =async (values) => {
	        const response =  await addUser(values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 return  (
	 	<Modal title={uid===undefined?"添加用户":"编辑用户"} visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 			initialValues ===undefined && uid!=undefined?<Skeleton active={true} paragrah={{row:4}} />: <ProForm onFinish={(values)=>{
	 					if(uid===undefined){
							createUser(values);
	 					}else{
	 						EditUser(values);
	 					}
	 					
	 				}
	 			} 
	 				initialValues={initialValues}>
	                    <ProFormText name="name" label="昵称" placeholder="请输入昵称" rules={[{required:true,message:"请输入昵称"}]} />
	                    <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required:true,message:"请输入邮箱"},{type:'email',message:"邮箱格式不正确"},]} />
                 	    {uid===undefined?<ProFormText.Password name="password" label="密码" placeholder="请输入密码" rules={[{required:true,message:"请输入密码"},{min:6,message:"密码最小6位"},]} />:""}

	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default CreateOrEdit;