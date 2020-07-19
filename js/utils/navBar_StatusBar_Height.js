import {Platform} from 'react-native';

const NAV_BAR_H_IOS = 44; // ios
const NAV_BAR_H_ANDROID = 50; // android
export const STATUS_BAR_H = Platform.OS === 'ios' ? 20 : null;
export const NAV_BAR_H =
  Platform.OS === 'ios' ? NAV_BAR_H_IOS : NAV_BAR_H_ANDROID;
