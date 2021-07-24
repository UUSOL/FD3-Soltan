import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {companyEvents} from './events.js';
import './HandleClient.css';

class HandleClient extends React.PureComponent {
    static propTypes = {
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
          }),
        workmode: PropTypes.string.isRequired,
    }

    state = {
        error: false,
    }

    famRef = null;
    setFamRef = (ref) => {
      this.famRef=ref;
    };

    balanceRef = null;
    setBalanceRef = (ref) => {
        this.balanceRef=ref;
    };

    imRef = null;
    setImRef = (ref) => {
      this.imRef=ref;
    };

    otchRef = null;
    setOtchRef = (ref) => {
      this.otchRef=ref;
    };

    edit = () => {
        if (!this.famRef) return;
        if (!this.famRef.value) {
            this.setState( {error: true } )
            return;
        }
        const client = this.props.client;
        client.fam = this.famRef.value;
        client.balance = +this.balanceRef.value;
        companyEvents.emit('EditClient', {...client});
    }

    add = () => {
        if (!this.famRef || !this.imRef || !this.otchRef || !this.balanceRef);
        if (!this.famRef.value || !this.imRef.value || !this.otchRef.value) {
            this.setState( {error: true } )
            return;
        }

        const client = this.props.client;
        client.fam = this.famRef.value;
        client.im = this.imRef.value;
        client.otch = this.otchRef.value;
        client.balance= +this.balanceRef.value;
        companyEvents.emit('AddClient', {...client});
    }

    cancel = () => {
        companyEvents.emit('Cancel');
    }
    render() {
        console.log('HandleClient render')
        return (    
            <div className="HandleClient">
                { 
                    this.state.error && 
                    <p className="error">Please fill in the form. All fields are required</p> 
                }
                <label className="field"> 
                    <span>Surname: </span>  
                    <input data-field="surname" type="text" 
                        defaultValue={this.props.client.fam} ref={this.setFamRef} />  
                </label>
                { 
                    this.props.workmode === 'create' &&
                        <Fragment>                           
                            <label className="field"> 
                                <span>First name: </span>  
                                <input data-field="name" type="text" 
                                    defaultValue={this.props.client.im} ref={this.setImRef} />
                            </label>
                            <label className="field"> 
                                <span>Middle name: </span>  
                                <input data-field="midname" type="text" 
                                    defaultValue={this.props.client.otch} ref={this.setOtchRef} />  
                            </label>
                        </Fragment>
                }
                <label className="field"> 
                    <span>Balance: </span>  
                    <input data-field="balance" type="number" 
                        defaultValue={this.props.client.balance} ref={this.setBalanceRef} />
                </label>
                <div className="Buttons">
                    <button onClick={(this.props.workmode === 'edit') ? this.edit : this.add}>Save</button>
                    <button onClick={this.cancel}>Cancel</button>  
                </div>
            </div>
        )
    }
}

export default HandleClient;