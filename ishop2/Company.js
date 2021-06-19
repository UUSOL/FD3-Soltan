var Company = React.createClass({

    displayName: "Company",
  
  	propTypes: {
  		companyName: React.PropTypes.string.isRequired,
    },

    render: function () {
    	return React.DOM.h1( {key: this.props.companyName, className: 'company-name'}, this.props.companyName);
    }
});