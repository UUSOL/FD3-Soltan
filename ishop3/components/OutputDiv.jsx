import React from 'react';
import PropTypes from 'prop-types';
import './OutputDiv.css';

class OutputDiv extends React.Component {

    static propTypes = {
        good: PropTypes.shape({
                title: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired
        }),
        workmode: PropTypes.string.isRequired,
        cbSave: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired,
        cbSetChangeMode: PropTypes.func.isRequired
    }

    state = {
        title: this.props.good.title,
        price: this.props.good.price,
        url: this.props.good.url,
        quantity: this.props.good.quantity,
        code: this.props.good.code,
        isInChangeMode: false,
        isReadyToSave: this.props.workmode === 'edit'
    }

    editField = (ev) => {
        this.setState({ [ev.target.dataset.field]: ev.target.value, isInChangeMode: true }, this.isEligibleToSave);
        if (!this.state.isInChangeMode) this.props.cbSetChangeMode(true);
    }

    isEligibleToSave = () => {
        if ( !this.state.title.length || !this.state.url.length || this.state.quantity === '' || !this.state.price.length) {
             this.setState({ isReadyToSave: false })
       } else {
             this.setState({ isReadyToSave: true })
       }
    }

    save = () => {
        this.props.cbSave(this.state.code, this.props.workmode, { ...this.state });
    }

    cancel = () => {
        this.props.cbCancel();
    }

    render() {
        return (   
            (this.props.workmode === 'edit' || this.props.workmode === 'create') ?    
            <div className="OutputDiv">
                <h2>{this.props.workmode} the good with the id {this.state.code}</h2>
                <label className="field">  
                    <span>Title: </span>            
                    <input data-field="title" type="text" 
                           defaultValue={this.state.title} onChange={this.editField} />   
                    <span className={ this.state.title ? 'hidden': 'error'}>Title can not be empty</span>
                </label> 
                <label className="field"> 
                    <span>Price: </span>  
                    <input data-field="price" type="text" 
                           defaultValue={this.state.price} onChange={this.editField} />
                    <span className={ this.state.price ? 'hidden': 'error'}>Price can not be empty</span>
                </label> 
                <label className="field"> 
                    <span>Url: </span>  
                    <input data-field="url" type="text" 
                           defaultValue={this.state.url} onChange={this.editField} />
                    <span className={ this.state.url ? 'hidden': 'error'}>Url can not be empty</span>
                </label> 
                <label className="field"> 
                    <span>Quantity: </span>  
                    <input data-field="quantity" type="number" 
                           defaultValue={this.state.quantity} onChange={this.editField} />
                    <span className={( this.state.quantity !== '' ) ? 'hidden' : 'error'}>Quantity can not be empty</span>
                </label> 
                <button onClick={this.save} disabled={!this.state.isReadyToSave}>Save</button>
                <button onClick={this.cancel}>Cancel</button>
            </div>
            
            :
            
            <div>
                <h2>Product with the id {this.state.code}</h2>
                <p>Title: {this.state.title}</p>
                <p>Price: {this.state.price}</p>
                <p className="url">URL: {this.state.url}</p>
                <p>Quantity: {this.state.quantity}</p>
            </div>
        );
    }
}

export default OutputDiv;