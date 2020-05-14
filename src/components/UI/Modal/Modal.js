import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import PropType from 'prop-types';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.show !== nextProps.show || this.props.children !== nextProps.children){
            return true;
        }
        else{
            return false;
        }
    }

    render(){
        return(
            <Auxiliary>
            <Backdrop cancel = {this.props.noOrder} show = {this.props.show}/>
            <div 
                className = {classes.Modal}
                style = {{
                    transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}
            >
            {this.props.children}
            </div>
        </Auxiliary>
        )
    } 
}

Modal.propTypes = {
    show   : PropType.bool,
    noOrder: PropType.func
}

export default Modal;