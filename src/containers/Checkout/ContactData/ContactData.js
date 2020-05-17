import React, {Component} from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        loading: false,
        formOrder: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "Name",
                    placeholder: "Your Name.",
                    value: ""
                },
                label: "Name",
               
            },
            email:{
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email.",
                    value: ""
                },
                label: "E-mail",
            },
            street:{    
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your street address.",
                    value: ""
                },
                label: "Street",
            },
            pinCode:{
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Your postal code.",
                    value: ""
                },
                label: "PIN Code",
            },
            country:{
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your country.",
                    value: ""
                },
                label: "Country",
            },
            delivery:{
                elementType: "dropdown",
                elementConfig: {
                    options: ["Super", "Normal"],
                    value: ""
                },
                label: "Delivery"
            }
        }
    }

    orderHandler = () => {
        this.setState({loading: true});

        let orderDetails = {};

        for(let key in this.state.formOrder){
            orderDetails[key] = this.state.formOrder[key].elementConfig.value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDetails: orderDetails
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
 
    inputChangeHandler = (event, formKey) => {
        
        let newformOrder   = {...this.state.formOrder};
        let formElement = {...newformOrder[formKey]};

        formElement.elementConfig.value = event.target.value;
        newformOrder[formKey] = formElement;

        this.setState({formOrder: newformOrder});
    }


    render(){
        let formElements = [];
        for(let formElement in this.state.formOrder){
            formElements.push({
                ...this.state.formOrder[formElement],
                id: formElement
            })
        }

        let form = (
            <form className = {classes.ContactForm} onSubmit = {this.orderHandler}>
                {
                    formElements.map((formElement) => (
                        <Input 
                            key           = {formElement.id} 
                            elementtype   = {formElement.elementType}
                            elementconfig = {formElement.elementConfig}
                            label         = {formElement.label}
                            inputChange   = {(event) =>this.inputChangeHandler(event, formElement.id)}
                        />
                    ))
                }
            <Button btnType="Success">ORDER NOW</Button>
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
