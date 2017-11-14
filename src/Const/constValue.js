/**
 * Created by mymac on 2017/10/11.
 */
import DeviceInfo from 'react-native-device-info';

export const is_iPhoneX             = DeviceInfo.getModel() === 'iPhone X';

export const Tabbar_Height          = (is_iPhoneX ? 34 + 49 : 49);

export const Tabbar_marginBottom    = (is_iPhoneX ? 34 : 0);

export const NavigationBar_Height   = 44;

export const StatusBar_Height       = (is_iPhoneX ? 44 : 20);

export const NavigationBar_StatusBar_Height = (NavigationBar_Height + StatusBar_Height);
