import React, {Component} from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        ingredients: null,
        totalPrice: null,
        loading: false
    }

    componentDidMount(){
        this.setState({ingredients: this.props.ingredients, totalPrice: this.props.price});
    }

    orderHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Max Schwartz",
                address: {
                    street: 'TestStreet',
                    zipCode: '412401',
                    country: 'Germany'
                },
                email: 'test@testMail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.replace("/");
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }



    render(){
        let form = (
            <form className = {classes.ContactForm}>
                <input 
                    className   = {classes.Input} 
                    type        = "text"   
                    name        = "name"   
                    placeholder = "Your Name." />
                <input 
                    className   = {classes.Input} 
                    type        = "email"  
                    name        = "email"  
                    placeholder = "Your Mail." />
                <input 
                    className   = {classes.Input} 
                    type        = "text"   
                    name        = "street" 
                    placeholder = "Your Street Address." />
                <input 
                    className   = {classes.Input} 
                    type        = "number" 
                    name        = "name"   
                    placeholder = "Your Postal Code." />
    
                <Button btnType="Success" clicked = {this.orderHandler}>ORDER NOW</Button>
            </form> 
        )

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className = {classes.ContactData}>
                <h3>Some details please...</h3>
                {form}
            </div>
        )
    }
}

export default ContactData;
