import React, { useEffect,useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { message,Modal ,Skeleton,Cascader,Button,Image} from 'antd';
import {addGoods,showGoods,updateGoods} from "@/services/goods";
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

	const {isModalVisible,isShowModal,actionRef,id}=props;

	useEffect(async ()=>{

		const resCategory=await getCategory();
		if(resCategory.status===undefined){
			setOptions(resCategory);
		}

		if(id!=undefined){
			const response =  await showGoods(id);
		        if(response.status===undefined){
		        	let category=response.category;
		        	let cid=category.id;
		        	let pid=category.pid;
		        	const defaultCategory=pid===0?[cid]:[pid,cid];
		        	setInitialValues({...response,category_id:defaultCategory});
		        }
		}		
	},[]);

	const EditGoods =async (values) => {
		//console.log("values:",values);return;
	        const response =  await updateGoods(id,{...values,category_id:values.category_id[1]});
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 const createGoods =async (values) => {
	        const response =  await addGoods(values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 return  (
	 	<Modal title={id===undefined?"添加商品":"编辑商品"} visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 			initialValues ===undefined && id!=undefined?<Skeleton active={true} paragrah={{row:4}} />: <ProForm form={form} onFinish={(values)=>{
	 					console.log("values:",values);
	 					if(id===undefined){
							createGoods({...values,category_id:values.category_id[1]});
	 					}else{
	 						EditGoods(values);
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
	                    <ProFormDigit name="sales" label="销量" placeholder="请输入销量" min={0} max={99999999} rules={[{required:true,message:"请输入销量"}]} />
	                    
	                    <ProFormText name="cover" hidden={true} />
	                    <ProForm.Item  	name="cover"	label="商品主图" rules={[{required:true,message:"请选择商品图片"}]} >
	                   	<div>
	 		    	 <AliyunOSSUpload  accept="image/*" setCoverKey={setCoverKey}  showUploadList={true}>
	 		    	 	<Button  icon={<UploadOutlined />}  >
			                        点击上传商品主图
			                </Button>
	 		    	 </AliyunOSSUpload>
	 		    	 { !initialValues?"":<Image src={initialValues.cover_url} width={200} />}
	 		    	 </div>
	 		    </ProForm.Item>
	                   

 			  <ProForm.Item  	name="details"	label="详情" rules={[{required:true,message:"请输入详情"}]} >
	                   	<Editor setDetails={setDetails} content={!initialValues?"":initialValues.details}/>
	 		 </ProForm.Item>

	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default CreateOrEdit;