import React, { useEffect,useState } from 'react';
import { message,Modal ,Skeleton} from 'antd';
import {addCategory,updateCategory,showCategory,getCategory} from "@/services/category";
import ProForm, { ProFormText,ProFormSelect } from '@ant-design/pro-form';

const CreateOrEdit=(props)=>{

	const [initialValues, setInitialValues] = useState(undefined);

	const [options, setOptions] = useState([]);	

	const {isModalVisible,isShowModal,actionRef,id}=props;

	useEffect(async ()=>{

		const resCategory =  await getCategory();

		let arr=[];
		resCategory.map((item)=>{
			arr.push({"value":item.id,"label":item.name});
		});
		setOptions(arr);

		if(id!=undefined){
			const response =  await showCategory(id);
		        setInitialValues({name:response.name,pid:response.pid});
		        
		}		
	},[]);

	const EditCategory=async (values) => {
	        const response =  await updateCategory(id,values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 const createCategory =async (values) => {
	 	console.log("====create====",values);
	        const response =  await addCategory(values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 return  (
	 	<Modal title={id===undefined?"添加分类":"编辑分类"} visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 			initialValues ===undefined && id!=undefined?<Skeleton active={true} paragrah={{row:4}} />: <ProForm onFinish={(values)=>{
	 					console.log("====values===",values);
	 					console.log("====id===",id);
	 					if(id===undefined){
							createCategory(values);
	 					}else{
	 						EditCategory(values);
	 					}
	 					
	 				}
	 			} 
	 				initialValues={initialValues}>

	 		<ProFormSelect
					              options={options}
					              width="md"
					              name="pid"
					              label="父级"
					            />

	                    <ProFormText name="name" label="分类" placeholder="请输入分类" rules={[{required:true,message:"请输入分类"}]} />

	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default CreateOrEdit;