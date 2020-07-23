import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                component : null
            }
        }

        componentDidMount(){
            importComponent()
                .then((component) => {
                    this.setState({component: component.default})
                })
        }

        render(){
            let Component = this.state.component;
            return Component ? <Component {...this.props} /> : null;
        }
    }
}

export default asyncComponent;