import React from 'react';
import PropTypes from 'prop-types';
import {companyEvents} from './events.js';
import './MobileCompany.css';
import Buttons from './Buttons.jsx';
import './Buttons.css';
import Client from './Client.jsx';
import HandleClient from './HandleClient.jsx';


class MobileCompany extends React.PureComponent {
    static propTypes = {
        companyName: PropTypes.string.isRequired,
        clientsArr: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              fam: PropTypes.string.isRequired,
              im: PropTypes.string.isRequired,
              otch: PropTypes.string.isRequired,
              balance: PropTypes.number.isRequired,
            })),
    }
    state = {
        companyName: this.props.companyName,
        clients: this.props.clientsArr,
        currentlySelected: 'all',
        workmode: 'read',
        clientToEdit: null,
        id: 300
    }

    setCompanyName = (ev) => {
        this.setState({companyName: ev.target.value})
    }
    
    sortClients = (currentlySelected) => {
        if (currentlySelected === this.state.currentlySelected) return;       
        this.setState({ currentlySelected: currentlySelected, workmode: 'read' })
    }

    addClient = (client) => {
        const newClients = [...this.state.clients, client]
        this.setState({ workmode: 'read', 
                        clients: newClients, 
                        clientToEdit: null, 
                        currentlySelected: 'all', 
                        id: ++this.state.id
                      });
    }

    editClient = (client) => {
        this.state.clients.forEach((cl, i) => {
            if(cl.id === client.id) this.state.clients[i] = client;
        });
        this.setState({ workmode: 'read', 
                        currentlySelected: 'all', 
                        clientToEdit: null });
    }

    setInitialClient = () => {
        if (this.state.workmode !== 'create') {
            this.setState({ workmode: 'create', clientToEdit: {
                id: this.state.id,
                fam: '',
                im: '',
                otch: '',
                balance: 0
            }});
        }
    }

    cancel = () => {
        this.setState({ workmode: 'read', clientToEdit: null })
    }
    changeWorkmode = (clientToEdit) => { 
        this.setState({workmode: 'edit', clientToEdit: clientToEdit})
    }

    deleteClient = (id) => {
        const newClients = this.state.clients.filter(client => client.id != id);
        this.setState({
           clients: newClients,
        });
    }

    componentDidMount = () => {
        companyEvents.addListener('SortClients',this.sortClients);
        companyEvents.addListener('DeleteClient',this.deleteClient);
        companyEvents.addListener('EditClient',this.editClient);
        companyEvents.addListener('AddClient',this.addClient);
        companyEvents.addListener('EditMode',this.changeWorkmode);
        companyEvents.addListener('Cancel',this.cancel);
    };
    
    componentWillUnmount = () => {
        companyEvents.removeListener('SortClients',this.sortClients);
        companyEvents.removeListener('DeleteClient',this.deleteClient);
        companyEvents.removeListener('EditClient',this.editClient);
        companyEvents.removeListener('AddClient',this.addClient);
        companyEvents.removeListener('EditMode',this.changeWorkmode);
        companyEvents.removeListener('Cancel',this.cancel);
    };

    render() {
        console.log("Mobile company render");

        const headers = ['Фамилия', 'Имя', 'Отчество', 'Баланс', 'Статус', 'Редактировать', 'Удалить']
            .map((header, i) => <th key={i}>{header}</th>);

        const clients = this.state.clients.filter(client => {
            if (this.state.currentlySelected === 'active') return client.balance >= 0;
            else if (this.state.currentlySelected === 'blocked') return client.balance < 0;
            return client;
        }).map(client => <Client key={client.id} client={client} />);

        return (
            <div className='MobileCompany'>
                <input type="button" value="МТС" onClick={this.setCompanyName}/>
                <input type="button" value="Velcom" onClick={this.setCompanyName}/>
                <h2 className='MobileCompanyName'>Компания: {this.state.companyName}</h2>
                <hr/>
                <Buttons />
                <hr/>
                <table className="table-content">
                    <thead>
                        <tr className='Headers'>{headers}</tr>
                    </thead>
                    <tbody>
                        {clients}
                    </tbody>
                </table>
                <hr/>
                <input className="Add" type="button" value="Добавить клиента" onClick={this.setInitialClient} />
                {
                    (this.state.workmode === 'edit' || this.state.workmode === 'create') &&
                    <HandleClient key={this.state.clientToEdit.id} 
                        client={this.state.clientToEdit} 
                        workmode={this.state.workmode} />
                }
            </div>           
          );
    }
}

export default MobileCompany;