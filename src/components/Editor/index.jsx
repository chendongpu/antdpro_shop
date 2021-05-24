import React from 'react'

// 引入编辑器组件
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

// 引入编辑器样式

import './index.less'
import AliyunOSSUpload from "../AliyunOSSUpload";
import { ContentUtils } from 'braft-utils'

export default class Editor extends React.Component {


    state = {

        // 创建一个空的editorState作为初始值

        editorState: BraftEditor.createEditorState(null)

    }


    // async componentDidMount () {

    //     // 假设此处从服务端获取html格式的编辑器内容

    //     const htmlContent = await fetchEditorContent()

    //     // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat

    //     this.setState({

    //         editorState: BraftEditor.createEditorState(htmlContent)

    //     })

    // }




    handleEditorChange = (editorState) => {
        console.log("editorState:",editorState.toHTML());

        this.setState({ editorState })

        if(!editorState.isEmpty()){
            this.props.setDetails(editorState.toHTML());
        }else{
            this.props.setDetails('');
        }
        


    }

    insertImage=(url)=>{
        this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
                type: 'IMAGE',
                url: url
            }])
        })
    }

    render () {


        const { editorState } = this.state

        const setCoverKey = fileKey=>form.setFieldsValue({'cover':fileKey});

        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <AliyunOSSUpload
                        accept="image/*"
                        showUploadList={false}
                        insertImage={this.insertImage}
                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button">
                            插入图片
                        </button>
                    </AliyunOSSUpload>
                )
            }
        ];

        return (

            <div className="my-editor">

                <BraftEditor

                    value={editorState}

                    onChange={this.handleEditorChange}

                    extendControls={extendControls}

                />

            </div>

        )


    }


}