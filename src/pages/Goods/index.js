import React, { useRef,useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Menu, Switch,Image } from 'antd';
import ProTable  from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getGoods,isOn,isRecommend} from "../../services/goods";

export default () => {
    const actionRef = useRef();
    const columns = [

        {
            title: '商品图片',
            dataIndex: 'cover_url',
            hideInSearch: true,
            render:(_,record)=><Image src={record.cover_url} width={200}  placeholder={
                <Image src={record.cover_url} width={200}  preview={false}/>
            }/>
        },
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '价格',
            hideInSearch: true,
            dataIndex: 'price',
        },
        {
            title: '库存',
            hideInSearch: true,
            dataIndex: 'stock',
        },
         {
            title: '销量',
            hideInSearch: true,
            dataIndex: 'sales',
        },
        {
            title: '是否上架',
            dataIndex: 'is_on',
            valueType:'radioButton',
            valueEnum:{
                1:{text:'上架'},
                0:{text:'下架'},
            },
            render:(_,record)=><Switch
                checkedChildren="上架"
                unCheckedChildren="下架"
                defaultChecked={ record.is_on===1 }
                onChange={()=>{
                        handleIsOn(record.id);
                    }
                }
            />
        },
        {
            title: '是否推荐',
            dataIndex: 'is_recommend',
            valueType:'radioButton',
            valueEnum:{
                1:{text:'已推荐'},
                0:{text:'未推荐'},
            },
            render:(_,record)=><Switch
                checkedChildren="已推荐"
                unCheckedChildren="未推荐"
                defaultChecked={ record.is_recommend===1 }
                onChange={()=>{handleIsRecommend(record.id);}}
            />
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            hideInSearch: true
        },
        {
            title: '操作',
            hideInSearch: true,
            render:(_,record)=><a onClick={()=>{}
            }>编辑</a>
        }
    ];

    const menu = (
        <Menu>
            <Menu.Item key="1">1st item</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
        </Menu>
    );
    const getData=async (params)=>{
      const response =  await getGoods(params);
      return{
          data:response.data,
          success:true,
          total:response.meta.pagination.total
      }
    };

      const handleIsOn=async (goodsid)=>{
        const response =  await isOn(goodsid);
        if(response.status===undefined){
            message.success("操作成功");
        }else{
            message.error("操作失败")
        }
    };

     const handleIsRecommend=async (goodsid)=>{
        const response =  await isRecommend(goodsid);
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
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>{}} >
                        新建
                    </Button>
                ]
            }
            />
        </PageContainer>
    );
}

