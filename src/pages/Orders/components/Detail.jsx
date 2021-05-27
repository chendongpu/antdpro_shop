import React, { useEffect,useState } from 'react';
import { Image,Modal ,Skeleton,List} from 'antd';
import {addUser,updateUser,getUser} from "@/services/user";
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {showOrders} from "@/services/orders";

const Detail=(props)=>{

	const [data, setData] = useState(undefined);

	const {isModalVisible,isShowModal,id}=props;


	useEffect(async ()=>{

				const response =  await showOrders(id);
				console.log("response--",response);

				let orderDetails= response.orderDetails.data;
				let goodsList=response.goods.data;

				let list=[];
				orderDetails.map(item=>{
					let goods=goodsList.find(goods=>{
						return goods.id===item.goods_id;
					});
					console.log("goods",goods);
					goods.num=item.num;
					goods.total=item.num*goods.price;
					list.push(goods);
				});
				console.log("list:",list);
				setData(list);


	},[]);





	 return  (
	 	<Modal title="订单详情" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>

            {
                data===undefined?<Skeleton active={true} paragrah={{row:4}} />:<List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={item.cover_url} width={50} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={"单价:"+item.price+" 数量:"+item.num + " 总价:"+item.total}
                        />
                    </List.Item>
                )}
            />}
		</Modal>
		);
}
export default Detail;