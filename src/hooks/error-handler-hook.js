import { useState, useEffect } from 'react';

const useError = (axios) => {

    const [error, changeErrorHandler] = useState(null);
      
    const reqInterceptor = axios.interceptors.request.use(req => {
        changeErrorHandler(null);
        return req;
    });
    
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
        changeErrorHandler(error);  
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }
    })

    const errorConfirmedHandler = () => {
        changeErrorHandler(null);
    }

    return [error, errorConfirmedHandler];
};

export default useError;

