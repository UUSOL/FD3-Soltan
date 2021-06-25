import React from 'react';
import PropTypes from 'prop-types';


class Company extends React.Component {
  
  	static propTypes = {
  		companyName: PropTypes.string.isRequired,
    };

    render() {
    	return <h1 className="company-name">{this.props.companyName}</h1>;
    }
};

export default Company;