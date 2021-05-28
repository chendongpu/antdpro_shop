import React, { useEffect,useState } from 'react';
import {Button, Image, message, Modal, Skeleton} from 'antd';
import {addSlides,updateSlides,showSlides} from "@/services/slides";
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {UploadOutlined} from "@ant-design/icons";
import AliyunOSSUpload from '@/components/AliyunOSSUpload'

const CreateOrEdit=(props)=>{

	const [initialValues, setInitialValues] = useState(undefined);

	const {isModalVisible,isShowModal,actionRef,id}=props;

    const [form]=ProForm.useForm();

    const setCoverKey = fileKey=>form.setFieldsValue({'img':fileKey});

	useEffect(async ()=>{
		if(id!=undefined){
			const response =  await showSlides(id);
			setInitialValues({...response});
		}		
	},[]);

	const EditSlides =async (values) => {
	        const response =  await updateSlides(id,values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 const createSlides =async (values) => {
	        const response =  await addSlides(values);
	        if(response.status===undefined){
	            message.success("操作成功");
	            actionRef.current.reload();
	            isShowModal(false);
	        }

	 };
	 return  (
	 	<Modal title={id===undefined?"添加轮播":"编辑轮播"} visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>
	         {
	 			initialValues ===undefined && id!=undefined?<Skeleton active={true} paragrah={{row:4}} />: <ProForm  form={form} onFinish={(values)=>{
	 					if(id===undefined){
                            createSlides(values);
	 					}else{
	 						EditSlides(values);
	 					}
	 					
	 				}
	 			} 
	 				initialValues={initialValues}>
	                    <ProFormText name="title" label="名称" placeholder="请输入名称" rules={[{required:true,message:"请输入名称"}]} />
	                    <ProFormText name="url" label="跳转连接" placeholder="请输入跳转连接" rules={[{required:true,message:"请输入跳转连接"},{type:'url',message:"跳转连接格式不正确"},]} />
                    	<ProFormText name="seq" label="排序" placeholder="请输入排序"  />


                    <ProFormText name="img" hidden={true} />
                    <ProForm.Item  name="img"	label="轮播图" rules={[{required:true,message:"请选择轮播图"}]} >
                        <div>
                            <AliyunOSSUpload  accept="image/*" setCoverKey={setCoverKey}  showUploadList={true}>
                                <Button  icon={<UploadOutlined />}  >
                                    点击上传轮播图
                                </Button>
                            </AliyunOSSUpload>
                            { !initialValues?"":<Image src={initialValues.img_url} width={200} />}
                        </div>
                    </ProForm.Item>

	                </ProForm>
	 		}
	               
	            </Modal>
	            );
}
export default CreateOrEdit;