import React from 'react';
import PropTypes from 'prop-types';
import './Client.css';
import {companyEvents} from './events.js';

class Client extends React.PureComponent {
    static propTypes = { 
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
    }

    deleteClient = () => {
        companyEvents.emit('DeleteClient', this.props.client.id);
    }

    editMode = () => {
        companyEvents.emit('EditMode', this.props.client);
    }

    render() {
        console.log("Client render");
        return  <tr className="Client">
                    <td>{this.props.client.fam}</td>
                    <td>{this.props.client.im}</td>
                    <td>{this.props.client.otch}</td>
                    <td>{this.props.client.balance}</td>
                    <td className={this.props.client.balance >= 0 ? 'active' : 'blocked'}>
                        {this.props.client.balance >= 0 ? 'active' : 'blocked'}
                    </td>
                    <td><input type="button" value="Редактировать" onClick={this.editMode}/></td>
                    <td><input type="button" value="Удалить" onClick={this.deleteClient} /></td>
                </tr>
    }
}

export default Client;