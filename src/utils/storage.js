/**
 * Created by mymac on 2017/9/21.
 */
import {AsyncStorage} from 'react-native';

class DB {

    async save(key, value) {
        let result = value;
        if (value && typeof value === 'object') {
            result = JSON.stringify(value);
        }
        return await AsyncStorage.setItem(key, result);
    }

    async get(key) {
        const value = await AsyncStorage.getItem(key);
        let result;
        try {
            result = JSON.parse(value);
        } catch (e) {
            console.warn(e);
            result = value;
        } finally {
            return result;
        }
    }
    /**
     * [multiGet description]
     *        multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
     * @param  {[type]} keys [description]
     * @return {[type]}      [description]
     */
    async multiGet(keys) {
        const values = await AsyncStorage.multiGet(keys);
        const result = {};
        values.forEach((value) => {
            let newValue;
            try {
                newValue = JSON.parse(value[1]);
            } catch (e) {
                newValue = value[1];
            }
            result[value[0]] = newValue;
        });
        return result;
    }

    mergeItem(key, value) {
        let result = value;
        if (typeof value === 'object') {
            result = JSON.stringify(value);
        }
        return AsyncStorage.mergeItem(result);
    }

    remove(key) {
        return AsyncStorage.removeItem(key);
    }

    clear() {
        return AsyncStorage.clear();
    }

}

const instance = new DB();

export default instance;
