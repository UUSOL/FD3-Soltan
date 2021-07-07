import React from 'react';
import PropTypes from 'prop-types';


class Good extends React.Component {
  
    static propTypes = {
        cbSelect: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired, 
        cbDelete: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        isInChangeMode: PropTypes.bool.isRequired,
        good: PropTypes.shape({
                title: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired
        })
    }

    selectRow = (ev) => {
        ev.stopPropagation();
        this.props.cbSelect(ev.target.parentNode.dataset.id, this.props.good);
    }

    editRow = (ev) => {
        ev.stopPropagation();
        this.props.cbEdit(ev.target.dataset.id, this.props.good);   
    }

    deleteRow = (ev) => {
        ev.stopPropagation();
        if (confirm('Are You sure?')) this.props.cbDelete(ev.target.dataset.id);
    }

    render() {
        return (
                <tr data-id={this.props.good.code} 
                    onClick={this.selectRow} 
                    className={ (this.props.isSelected) ? 'focused' : null } >
                    
                        <td>{this.props.good.title}</td>
                        <td>{this.props.good.price}</td>
                        <td className="url">
                            <a href={this.props.good.url}>{this.props.good.url}</a>
                        </td>
                        <td>{this.props.good.quantity}</td>
                        <td>
                            <button data-id={this.props.good.code} 
                                    onClick={this.editRow}
                                    disabled={this.props.isInChangeMode}>
                                        EDIT
                            </button>
                            <button data-id={this.props.good.code} 
                                    onClick={this.deleteRow}
                                    disabled={this.props.isInChangeMode}>
                                        DELETE
                            </button>
                        </td>
               </tr>
        );
    }
}

export default Good;