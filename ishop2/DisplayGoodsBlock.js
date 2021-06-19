var DisplayGoodsBlock = React.createClass({

    displayName: "DisplayGoodsBlock",
  
    propTypes: {
    	companyName: React.PropTypes.string.isRequired,
        goods: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return { 
            goodSelected: null,
            goods: this.props.goods
        };
    },

    cbSelect: function(code) {
        this.setState({goodSelected: code});
    },
    
    cbDelete: function(code) {
        this.setState({goods: this.state.goods.filter(good => good.code != code)})
    },

    render: function () {
    	var headers = ['Title', 'Price', 'Url', 'Quantity', 'Control']
    			.map(header => React.DOM.th({key: header}, header));

        var goodsList = this.state.goods.map(good => React.createElement(Good, {
        							key: good.code,
       								cbSelect: this.cbSelect,
       								cbDelete: this.cbDelete,
       								isSelected: this.state.goodSelected == good.code,
       								good: good } ));

    	return React.DOM.div({className: 'display-goods'}, 
    				React.createElement(Company, {companyName: this.props.companyName}), 
    				React.DOM.table( null, 
    		    		React.DOM.thead( null, 
                			React.DOM.tr( null, headers)),
                		React.DOM.tbody( null, goodsList))
        );
    }
});