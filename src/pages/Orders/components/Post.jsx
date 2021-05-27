import React, { useEffect,useState } from 'react';
import { message,Modal } from 'antd';
import {showOrders,postOrders} from "@/services/orders";
import ProForm, { ProFormText,ProFormSelect } from '@ant-design/pro-form';

const Post=(props)=>{

	const {isModalVisible,isShowModal,actionRef,id}=props;

    const [options, setOptions] = useState([]);

	useEffect(async ()=>{
		setOptions([
			{"value":"SF","label":"SF"},
			{"value":"YTO","label":"YTO"},
			{"value":"YD","label":"YD"}
			]);
	},[]);


	const PostOrder =async (values) => {
	        const response =  await postOrders(id,values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };

	 return  (
	 	<Modal title="发货" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 			 <ProForm onFinish={(values)=>{
                     PostOrder(values);
	 				}
	 			}>
	                    <ProFormSelect name="express_type" label="快递类型" placeholder="请选择快递类型" options={options} rules={[{required:true,message:"请选择快递类型"}]} />
	                    <ProFormText name="express_no" label="快递单号" placeholder="请输入快递单号" rules={[{required:true,message:"请输入快递单号"}]} />

	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default Post;