import React, { useEffect,useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { message,Modal ,Skeleton,Cascader,Button} from 'antd';
import {addUser,updateUser,getUser} from "@/services/user";
import {getCategory} from "@/services/category";
import ProForm, { ProFormText,ProFormTextArea,ProFormDigit,ProFormUploadButton } from '@ant-design/pro-form';
import AliyunOSSUpload from '@/components/AliyunOSSUpload'
import Editor from '@/components/Editor'

const CreateOrEdit=(props)=>{

	const [initialValues, setInitialValues] = useState(undefined);
	const [options, setOptions] = useState(undefined);

	const [form]=ProForm.useForm();

	const setCoverKey = fileKey=>form.setFieldsValue({'cover':fileKey});

	const setDetails = content=>form.setFieldsValue({'details':content});

	const {isModalVisible,isShowModal,actionRef,uid}=props;

	useEffect(async ()=>{

		const resCategory=await getCategory();
		if(resCategory.status===undefined){
			setOptions(resCategory);
		}

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
	 	<Modal title={uid===undefined?"添加商品":"编辑商品"} visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 			initialValues ===undefined && uid!=undefined?<Skeleton active={true} paragrah={{row:4}} />: <ProForm form={form} onFinish={(values)=>{
	 					console.log("values:",values);
	 					return;
	 					if(uid===undefined){
							createUser(values);
	 					}else{
	 						EditUser(values);
	 					}
	 					
	 				}
	 			} 
	 				initialValues={initialValues}>
	 		    <ProForm.Item  	name="category_id"	label="分类" rules={[{required:true,message:"请选择分类"}]} >
	 		    	<Cascader fieldNames={{label:'name',value:'id'}} options={options} placeholder="请选择分类"/>
	 		    </ProForm.Item>
	                    <ProFormText name="title" label="商品名" placeholder="请输入商品名" rules={[{required:true,message:"请输入商品名"}]} />
	                    <ProFormTextArea name="description" label="描述" placeholder="请输入描述" rules={[{required:true,message:"请输入描述"}]} />
	                    <ProFormDigit name="price" label="价格" placeholder="请输入价格" min={0} max={99999999} rules={[{required:true,message:"请输入价格"}]} />
	                    <ProFormDigit name="stock" label="库存" placeholder="请输入库存" min={0} max={99999999} rules={[{required:true,message:"请输入库存"}]} />
	                    
	                    <ProForm.Item  	name="cover"	label="商品主图" rules={[{required:true,message:"请选择商品图片"}]} >
	                   	<div>
	 		    	 <AliyunOSSUpload  accept="image/*" setCoverKey={setCoverKey}  showUploadList={true}>
	 		    	 	<Button key="button" icon={<UploadOutlined />}  >
			                        点击上传商品主图
			                </Button>
	 		    	 </AliyunOSSUpload>
	 		    	 </div>
	 		    </ProForm.Item>
	                   

 			  <ProForm.Item  	name="details"	label="详情" rules={[{required:true,message:"请输入详情"}]} >
	                   	<Editor setDetails={setDetails} />
	 		 </ProForm.Item>

	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default CreateOrEdit;