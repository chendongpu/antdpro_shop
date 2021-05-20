import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin,logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      if(response.status === undefined){
          message.success('登录成功！');
          yield put({
              type: 'changeLoginStatus',
              payload: response,
          }); // Login successfully

          history.replace('/');
      }



      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *logout(_,{call}) {

        const  load=message.loading('登出中...');

        const response = yield call(logout);

        if(response.status === undefined){

           localStorage.removeItem('access_token')
           localStorage.removeItem('userInfo')
            message.success('登出成功！');
            history.replace('/login');
        }
        load();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      //setAuthority(payload.currentAuthority);
        localStorage.setItem('access_token',payload.access_token);
      return { ...state };
    },
  },
};
export default Model;
