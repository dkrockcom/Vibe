import axios from 'axios';
import swal from 'sweetalert';
import { loading } from './../redux/actions';
// let { dispatch } = createStore(() => { });

class API {
    static _instance = null;
    static get baseUrl() {
        const { protocol, hostname, origin } = window.location;
        return origin.indexOf("localhost") > -1 || origin.indexOf("192.168.92.195") > -1 ? (protocol + "//" + hostname) : origin;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = axios.create({
                baseURL: `${this.baseUrl}/api`,
                timeout: 30000,
                withCredentials: true,
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
            });
        }
        return this._instance;
    }

    static toFormData = (item) => {
        let form_data = new FormData();
        let values = this.clean(item);
        for (let key in values) {
            form_data.append(key, values[key]);
        }
        return form_data;
    }

    static clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return obj
    }

    static post(api, data, cb, dispatch = () => { }) {
        dispatch(loading({ isLoad: true }));
        this.instance.post(api, this.toFormData(data)).then((res) => {
            dispatch(loading({ isLoad: false }));
            if (res.status === 400) {
                swal({ title: "400: Bad Request", icon: 'error' });
            } else if (res.status === 401) {
                swal({ title: "401: Unauthorized session expired", icon: 'error' });
            } else if (res.status === 403) {
                swal({ title: "403: Forbidden", icon: 'error' });
            } else if (res.status === 500) {
                swal({ title: "500: Internal Server Error", icon: 'error' });
            } else if (res.status === 200) {
                cb && cb(res.data);
            } else {
                swal({ title: `${res.status}: Error`, icon: 'error' });
            }
        }).catch((error) => {
            dispatch(loading({ isLoad: false }));
            swal({ title: error.message, icon: 'error' });
        });
    }

    // get(api, data, cb) {
    //     dispatch(loading({ isLoad: true }));
    //     this.instance.get(api, data).then((res) => {
    //         dispatch(loading({ isLoad: false }));
    //         if (res.status == 400) {
    //             swal({ title: "400: Bad Request", icon: 'error' });
    //         } else if (res.status == 401) {
    //             swal({ title: "401: Unauthorized session expired", icon: 'error' });
    //         } else if (res.status == 403) {
    //             swal({ title: "403: Forbidden", icon: 'error' });
    //         } else if (res.status == 500) {
    //             swal({ title: "500: Internal Server Error", icon: 'error' });
    //         } else if (res.status == 200 && cb) {
    //             cb(res.data);
    //         } else {
    //             swal({ title: `${res.status}: Error`, icon: 'error' });
    //         }
    //     }).catch((error) => {
    //         dispatch(loading({ isLoad: false }));
    //         swal({ title: error.message, icon: 'error' });
    //     });
    // }
}
export default API;