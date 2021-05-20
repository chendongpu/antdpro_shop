import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Tabs } from 'antd';
import React, { useState,useEffect } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage,history } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
    useEffect(()=>{
        const userInfo=localStorage.getItem("userInfo");
        if(userInfo) history.replace('/');
    },[]);

  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const intl = useIntl();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          console.log("values:",values);
          return Promise.resolve();
        }}
      >


        {status === 'error' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Incorrect account or password（admin/ant.design)',
            })}
          />
        )}

            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="邮箱: super@a.com"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
                  {
                      type: 'email',
                      message: "请输入正确的邮箱格式!",
                  },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码: 123123"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            />




      </ProForm>

    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
