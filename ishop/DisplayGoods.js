var DisplayGoods = React.createClass({

    displayName: "DisplayGoods",
  
    render: function () {
        var headers = Object.keys(this.props.goods[0])
                              .map(header => React.DOM.th({key: header}, header));

        var goodsList = this.props.goods.map( good => {
            return   React.DOM.tr( {key: good.url},
                        React.DOM.td( null, good.title),
                        React.DOM.td( null, good.price),
                        React.DOM.td( {className:'url'}, 
                            React.DOM.a( {href: good.url}, good.url)),
                        React.DOM.td( null, good.rest),
                     );
        });
      
        return React.DOM.div( {className: 'display-goods'},
                React.DOM.h1( {key: this.props.companyName, className: 'company-name'}, this.props.companyName),
                React.DOM.table( null, 
                   React.DOM.thead( null, 
                       React.DOM.tr( null, headers)),
                   React.DOM.tbody( null, goodsList)
               ));
    },
});