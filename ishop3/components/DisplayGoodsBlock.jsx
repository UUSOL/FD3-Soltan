import React from 'react';
import PropTypes from 'prop-types';

import Company from './Company.jsx';
import Good from './Good.jsx';
import OutputDiv from './OutputDiv.jsx';
import './DisplayGoodsBlock.css';

class DisplayGoodsBlock extends React.Component {
  
    static propTypes = {
    	companyName: PropTypes.string.isRequired,
        goods: PropTypes.array.isRequired
    }

    state = { 
        goodSelected: null,
        goods: this.props.goods,
        goodToDisplay: null,
        workmode: 'read',
        isInChangeMode: false,
        lastGoodId: this.props.goods.length
    }

    cbSave = (code, workmode, good) => {
        const goodToChange = this.state.goods.find(obj => obj.code == code) || {};      
            goodToChange.title = good.title;
            goodToChange.price = good.price;
            goodToChange.url = good.url;
            goodToChange.quantity = +good.quantity;
        
        if (workmode == 'create') {
            goodToChange.code = good.code;
            this.state.goods.push(goodToChange);
        }

        this.setState({ workmode: 'read', isInChangeMode: false, goodToDisplay: goodToChange });
    }

    cbSelect = (code, goodObj) => {
        this.setState({goodSelected: code, goodToDisplay: goodObj, workmode: 'read'});
    }

    cbEdit = (code, goodObj) => {  
        this.setState({goodSelected: code, goodToDisplay: goodObj, workmode: 'edit' })     
    }
    
    cbSetChangeMode = (bool) => {
        this.setState({ isInChangeMode: bool });
    }

    cbDelete = (code) => {
        this.setState({ goods: this.state.goods.filter(good => good.code != code), 
                        goodToDisplay: (this.state.goodSelected == code) ? null : this.state.goodToDisplay });
    }

    cbCancel = () => {
        this.setState({ workmode: 'read', 
                        isInChangeMode: false,
                        goodToDisplay: this.state.goods.find(obj => obj.code == this.state.goodSelected) || null,
                        lastGoodId: (this.state.workmode == 'create') ? --this.state.lastGoodId : this.state.lastGoodId
                    });
    }

    create = () => {
        this.setState( { goodToDisplay: {
                title: '',
                price: '',
                url: '',
                quantity: 0,
                code: ++this.state.lastGoodId  
            }, 
            workmode: 'create'   
        })
    }

    render() {
    	const headers = ['Title', 'Price', 'Url', 'Quantity', 'Control']
    			.map(header => <th key={header}>{header}</th>);

        const goodsList = this.state.goods.map(good => <Good
        							key={good.code}
       								cbSelect={this.cbSelect}
                                    cbEdit={this.cbEdit}
       								cbDelete={this.cbDelete}
       								isSelected={this.state.goodSelected == good.code}
                                    isInChangeMode={this.state.isInChangeMode}
       								good={good} />);

    	return (              
                <div className="display-goods">
    				<Company companyName={this.props.companyName} />
    				<table className={ (this.state.isInChangeMode) ? 'disabled': null }> 
    		    		<thead>
                           <tr>{headers}</tr>
                        </thead>
                		<tbody>{goodsList}</tbody>
                    </table>
                    <button onClick={this.create}
                            className={ (this.state.isInChangeMode) ? 'disabled': null} 
                            disabled={this.state.workmode === 'create' || this.state.isInChangeMode}>
                                Create
                    </button>
                    { 
                        this.state.goodToDisplay &&
                        <OutputDiv  key={this.state.goodToDisplay.code + this.state.workmode} 
                                    good={this.state.goodToDisplay} 
                                    workmode={this.state.workmode}
                                    cbSave={this.cbSave}
                                    cbCancel={this.cbCancel}
                                    cbSetChangeMode={this.cbSetChangeMode} />
                    }          
                </div>
        );  
    }
}
export default DisplayGoodsBlock;