import { Select } from "antd";

export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const renderOptions = (arr) => {
    let results = []
    if (arr) {
        results = arr?.map((option) => {
            return {
                value: option,
                label: option
            }
        })
        results.push({
            label: 'Thêm type',
            value: 'Add_type'
        })
        return results
    }
}

export const convertPrice = (price) => {
    try {
        // Chuyển đổi price thành số nguyên để loại bỏ các số thập phân nếu có
        const number = parseInt(price, 10);

        // Kiểm tra nếu giá trị không phải là số hợp lệ thì trả về null
        if (isNaN(number)) {
            return null;
        }

        // Sử dụng toLocaleString để định dạng số với dấu chấm (.)
        const result = number.toLocaleString('de-DE');

        return `${result} VND`;
    } catch (error) {
        return null;
    }
}

export const initFacebookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse();
    }

    let locale = "vi_VN"; // Thay đổi ngôn ngữ theo mong muốn

    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.REACT_APP_FB_ID, // App ID của bạn
            cookie: true, // Cho phép cookies để máy chủ có thể truy cập phiên
            xfbml: true, // Phân tích các plugin xã hội trên trang này
            version: "v8.6", // Sử dụng phiên bản 2.1
        });
    };

    // Tải SDK bất đồng bộ
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};