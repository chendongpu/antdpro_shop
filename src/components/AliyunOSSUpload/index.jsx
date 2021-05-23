import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {ossConfig} from '@/services/common'

export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await ossConfig();
      console.log("OSSData:",OSSData);
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  onChange = ({ file }) => {
    const { onChange } = this.props;
    console.log('file:', file);
    if (file.status==='done') {
      this.props.setCoverKey(file.key);
        message.success('上传成功');
    }
  };

  getExtraData = file => {
    const { OSSData } = this.state;
    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async file => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;

    const dir='react_chendongpu/';

    file.key= OSSData.dir+dir+filename;
    file.url = OSSData.host+OSSData.dir+dir + filename;

    return file;
  }

  render() {
    const { value,accept } = this.props;
    const props = {
      accept:accept||'',
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType: "picture",
      maxCount:1
    };
    return (
      <Upload {...props}>
       {this.props.children}
      </Upload>
    );
  }
}