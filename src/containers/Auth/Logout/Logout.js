import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actionCreators from '../../../store/actions/action-index';

const logout = React.memo(() => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(actionCreators.authLogout());
    }

    useEffect(() => {
        onLogout();
    }, []);
 
    return(
        <div>
            <Redirect to = "/" />
        </div>
    )
});

export default logout;