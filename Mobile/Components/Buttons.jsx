import React from 'react';
import PropTypes from 'prop-types';
import {companyEvents} from './events.js';


class Buttons extends React.PureComponent {

    sort = (ev) => {
        companyEvents.emit('SortClients',ev.target.dataset.option);
    }

    render() {
        console.log("SortButton render");
        return (
            <div className="Buttons">
                <input type="button" value="Все" data-option='all' onClick={this.sort} />
                <input type="button" value='Активные' data-option='active' onClick={this.sort} />
                <input type="button" value='Заблокированные' data-option='blocked' onClick={this.sort} />
            </div>
        );
    }
}

export default Buttons;