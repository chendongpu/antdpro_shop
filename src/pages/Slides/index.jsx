import React, { useRef,useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Image, message, Menu, Switch,Popconfirm } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getSlides,changeStatus,deleteSlides} from "../../services/slides";
import CreateOrEdit from './components/CreateOrEdit';
import ProForm from "@ant-design/pro-form";

export default () => {
    const actionRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const isShowModal = (visible) => {
        setIsModalVisible(visible);
    };

    const [id, setId] = useState(undefined);

    const columns = [

        {
            title: '轮播图',
            dataIndex: 'img_url',
            hideInSearch: true,
            render:(_,record)=><Image src={record.img_url} width={200} />
        },
        {
            title: '名称',
            dataIndex: 'title',
        },
        {
            title: '跳转连接',
            dataIndex: 'url',
        },
        {
            title: '是否禁用',
            dataIndex: 'status',
            hideInSearch: true,
            render:(_,record)=><Switch
                checkedChildren="禁用"
                unCheckedChildren="正常"
                defaultChecked={ record.status===0 }
                onChange={()=>{changeData(record.id)}}
            />
        },
        {
            title: '排序',
            dataIndex: 'seq',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            hideInSearch: true
        },
        {
            title: '操作',
            hideInSearch: true,
            render:(_,record)=>[<a onClick={()=>{
                    isShowModal(true);
                    setId(record.id);
                }
            }>编辑</a>,
                <Popconfirm title="你确定要删除吗?"
                            onConfirm={()=>{
                                deleteData(record.id)
                            }}
                            okText="是"
                            cancelText="否"><a href="#">删除</a></Popconfirm> ]
        }
    ];

    const getData=async (params)=>{
      const response =  await getSlides(params);
      return{
          data:response.data,
          success:true,
          total:response.meta.pagination.total
      }
    };

    const deleteData=async (params)=>{
        const response =  await deleteSlides(params);
        if(response.status===undefined){
            message.success("操作成功");
            actionRef.current.reload();
        }
    };

    const changeData=async (id)=>{
        const response =  await changeStatus(id);
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
            search={false}
            pagination={{
                pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>{isShowModal(true);setId(undefined);}} >
                        新建
                    </Button>
                ]
            }
            />
            {isModalVisible?<CreateOrEdit isModalVisible={isModalVisible} isShowModal={isShowModal} actionRef={actionRef} id={id}/>:""}
        </PageContainer>
    );
}

