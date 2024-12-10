import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
    const [valuedebounce, setValueDebounce] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setValueDebounce(value);
        }, delay);

        return () => { // hàm dọn dẹp tránh timeout chạy chồng chéo lên nhau khi value thay đổi
            clearTimeout(handler);
        };
    },[value]);

    return valuedebounce;
} 