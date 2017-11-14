import Storage from './storage';
import Toast from '@remobile/react-native-toast';

// const headers = {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
// };
const headers = {
    "enctype": "application/x-www-form-urlencoded"
};

const imageHeaders = {
    "Content-Type": "multipart/form-data",
};

const _fetch = (fetch_promise, timeout = 30000) => {
    let abort_fn = null;
    const abort_promise = new Promise((resolve, reject) => {
        abort_fn = () => {
            const err = new Error('timeout');
            reject(err);
        }
    });
    // 接收一个数组，只要该数组中的 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回
    const abortable_promise = Promise.race([fetch_promise, abort_promise]);
    setTimeout(() => {
        abort_fn()
    }, timeout);
    return abortable_promise;

};

/*
 * url              ：接口地址
 * params           ：接口参数对象{}
 * loadingCallBack  ：请求中回调
 * successCallBack  ：请求成功回调
 * failCallBack     ：请求失败回调
 * finishCallBack   : 请求完成回调
 * */

/* using
*  import HTTPRequest from '';
*
    HTTPRequest({
        url: ''
        params: {},
        loading: ()=>{

        },
        success: (responseData)=>{

        },
        error: (errorInfo)=>{

        },
        finish:()=>{

        }
    });
* */
const postRequest = (
    {
        mode: mode,
        url: url,
        params: params,
        loading: loadingCallBack,
        success: successCallBack,
        error: failCallBack,
        finish: finishCallBack
    }) => {

    if (loadingCallBack)
        loadingCallBack();


    if (!params) {
        params = {}
    }



    const jsonBody = JSON.stringify(params);

    console.log("%c%s",
        "color: green; font-size: 18px;",
        jsonBody,url,'的请求参数');

    const myFetch = fetch(url, {
        method: mode,
        headers,
        body: jsonBody,
    });
        _fetch(myFetch, 30000)
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                if (successCallBack)
                    successCallBack(responseData);

                if (finishCallBack)
                    finishCallBack();

                console.log("%c%s",
                    "color: red; font-size: 17px;",
                    url,'的请求结果',responseData);
            })
            .catch(error => {
                console.log("----http error----%c%s",
                    "color: red; font-size: 20px;",
                    error.message, url);

                Toast.showShortCenter('网络异常');

                if (failCallBack)
                    failCallBack();

                if (finishCallBack)
                    finishCallBack();
            });
};


export default postRequest;



