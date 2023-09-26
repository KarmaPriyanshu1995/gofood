import * as React from 'react';
import { Alert, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Config from './Config';
import DeviceInfo from 'react-native-device-info';
import AlertMsg from './AlertMsg';

export default class Helper extends React.Component {
    url = "";
    static mainApp;
    static toast;
    static Loader;
    static device_type = Platform.OS == 'android' ? 'Android' : 'IOS';
    static device_token = "";
    static device_id = DeviceInfo.getDeviceId();
    static globalLoader;
    static sendId;
    static sendEdiiItem;
    static hasnotch = DeviceInfo.hasNotch();
    static userloginID;
    static location="";
    static googleClientId = "497150098672-n85mjdcnbbls1dqp3ak060r8keo7upcs.apps.googleusercontent.com";
    static iosClientID="497150098672-4o3r4q6gk1o344h8bclumivja8duj1le.apps.googleusercontent.com";
    static androidClientID="497150098672-v5q2asn889tajf7sk3pca7bnfrl49ob1.apps.googleusercontent.com"
  
    static getFormData(obj) {
        let formData = new FormData();
        for (let i in obj) {
            formData.append(i, obj[i]);
        }
        return formData;
    }

    static registerLoader(mainApp) {
        Helper.globalLoader = mainApp;
    }

    static showLoader() {
        Keyboard.dismiss();
        Helper.globalLoader.setState({ loader: true })
    }

    static hideLoader() {
        Helper.globalLoader.setState({ loader: false })
    }

    static registerToast(toast) {
        Helper.toast = toast;
    }

    static showToast(msg) {
        Toast.show(msg, Toast.BOTTOM)
    }

    static alert(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }

    static confirm(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
                { text: 'Cancel', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static confirmPopUp(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'YES', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
                { text: 'NO', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static permissionConfirm(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'NOT NOW', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
                { text: 'SETTINGS', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }

    static cameraAlert(alertMessage, Camera, Gallery, Cancel, cbCamera, cbGallery) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: Camera, onPress: () => { if (cbCamera) cbCamera(true); console.log('OK Pressed') } },
                { text: Gallery, onPress: () => { if (cbGallery) cbGallery(true); console.log('OK Pressed') } },
                { text: Cancel, onPress: () => { if (cbCamera) cbCamera(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static async setData(key, val) {
        try {
            let tempval = JSON.stringify(val);
            await AsyncStorage.setItem(key, tempval);
        } catch (error) {
            console.error(error, "AsyncStorage")
        }
    }

    static async getData(key) {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value) {
                let newvalue = JSON.parse(value);
                return newvalue;
            } else {
                return value;
            }
        } catch (error) {
            console.error(error, "AsyncStorage")
        }
    }

    static async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }

    static async makeRequest ({ url, data, method = "POST" }) {
        let finalUrl = Config.baseurl + url;
        console.log(finalUrl, "finalUrl");
        let form;
        let methodnew;
        let token = await this.getData("token");
        console.log("++++++++++++token", token)
        let varheaders;
        if (method == "POSTUPLOAD") {
            methodnew = "POST";
            varheaders = {
                "Accept": "application/json",
                'Content-Type': "multipart/form-data",
                'Authorization': token
            }
            // /form = JSON.stringify(data);
            form = data;
        }

        else if (method == "POST") {
            methodnew = "POST";
            if (token) {
                varheaders = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            } else {
                varheaders = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            form = JSON.stringify(data);
        }
        else {
            methodnew = "GET";
            if (token) {
                varheaders = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            } else {
                varheaders = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        }
        return await fetch(finalUrl, {
            body: form,
            method: methodnew,
            headers: varheaders,
        })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                if (responseJson.hasOwnProperty('status')) {
                    if (responseJson.error === 401) {
                        AsyncStorage.removeItem('userdata');
                        AsyncStorage.removeItem('token');
                        Toast.show(responseJson.message);
                    }
                } else
                    return responseJson;
            })
            .catch((error) => {
                Toast.show(AlertMsg.error.INTERNET_CONNECTION);
                console.log("=========error: ", error)
            });
    }
}
