import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

import useError from '../../hooks/error-handler-hook';


const withErrorHandler = (WrappedComponent, axios) => {
    return (props) =>  {
        const [error, errorConfirmedHandler] = useError(axios);

        return(
            <Auxiliary>
                <Modal show = {error} noOrder = {errorConfirmedHandler}>
                    {error 
                        ? 
                        <h1 style = {{textAlign: "center"}}>
                            {error.message}
                        </h1>
                        : null
                    }
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        )
    }
};

export default withErrorHandler;