/**
 * Created by chj on 2017/10/20.
 */
// * as  是把action里面所有 export 的都import 进来， 可以使用 .属性 访问
import  * as ACTIONTYPE from './actionTypes'

// 修改 state.text
export const ACTION_TEST = (obj) => {
    return {
        type: ACTIONTYPE.ACTION_TEST,
        object: obj,
    };
};



