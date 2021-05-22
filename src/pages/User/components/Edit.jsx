import React, { useEffect,useState } from 'react';
import { message,Modal ,Skeleton} from 'antd';
import {updateUser,getUser} from "@/services/user";
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Edit=(props)=>{

	const [initialValues, setInitialValues] = useState(undefined);

	const {isModalVisible2,isShowModal2,actionRef,uid}=props;

	useEffect(async ()=>{
		const response =  await getUser(uid);
	        if(response.status===undefined){
	        	setInitialValues({name:response.name,email:response.email,});
	        }
	},[]);

	const EditUser =async (values) => {
	        const response =  await updateUser(uid,values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal2(false);
	        }

	 };
	 return  (
	 	<Modal title="编辑用户" visible={isModalVisible2} onCancel={()=>isShowModal2(false)} footer={null} destoryOnClose={true}>
	                
	 		{
	 			initialValues ===undefined?<Skeleton active={true} paragrah={{row:4}} />: <ProForm onFinish={(values)=>{EditUser(values)}} initialValues={initialValues}>
	                    <ProFormText name="name" label="昵称" placeholder="请输入昵称" rules={[{required:true,message:"请输入昵称"}]} />
	                    <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required:true,message:"请输入邮箱"},{type:'email',message:"邮箱格式不正确"},]} />
	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default Edit;