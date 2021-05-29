import React, { useEffect,useState } from 'react';
import { Image,Modal ,Skeleton,List,Divider} from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {showComments} from "@/services/comments";

const Detail=(props)=>{

	const [data, setData] = useState(undefined);
	const [content, setContent] = useState(undefined);
	const [reply, setReply] = useState(undefined);

	const {isModalVisible,isShowModal,id}=props;


	useEffect(async ()=>{

		const response =  await showComments(id);
		console.log("response--",response);


		let goods=response.goods;

		goods.total=goods.price*goods.sales;

		let list=[];
		list.push(goods)

	
		console.log("list:",list);
		setData(list);
		setContent(response.content);
		setReply(response.reply);


	},[]);





	 return  (
	 	<Modal title="评价详情" visible={isModalVisible} onCancel={()=>isShowModal(false)} footer={null} destoryOnClose={true}>

            {
                data===undefined?<Skeleton active={true} paragrah={{row:4}} />:
                <div>
                <Divider orientation="left" plain>
	      		评价商品
	    	</Divider>
	    	<List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={item.cover_url} width={50} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={"单价:"+item.price+" 数量:"+item.sales + " 总价:"+item.total}
                        />
                    </List.Item>
                )}
            	/>

            	<Divider orientation="left" plain>
	      		评价内容
	    	</Divider>
	    	  <p>
		     {content}
		    </p>
		    <Divider orientation="left" plain>
	      		回复内容
	    	</Divider>
	    	  <p>
		     {reply}
		    </p>
            </div>
        	}
		</Modal>
		);
}
export default Detail;