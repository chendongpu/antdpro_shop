import React, { useEffect,useState } from 'react';
import { message,Modal } from 'antd';
import {replyComments} from "@/services/comments";
import ProForm, { ProFormText,ProFormTextArea } from '@ant-design/pro-form';

const Reply=(props)=>{

	const {isModalVisible,isShowModal,actionRef,id}=props;


	const ReplyComments =async (values) => {
	        const response =  await replyComments(id,values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };

	 return  (
	 	<Modal title="回复" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 		<ProForm onFinish={(values)=> ReplyComments(values)}>
	                    <ProFormTextArea name="reply" label="回复内容" placeholder="请输入回复内容" rules={[{required:true,message:"请输入回复内容"}]} />
	                </ProForm>
	 	}
	               
	        </Modal>
	 );
}
export default Reply;