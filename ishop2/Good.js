var Good = React.createClass({

    displayName: "Good",
  
    propTypes: {
       cbSelect: React.PropTypes.func.isRequired,
       cbDelete: React.PropTypes.func.isRequired,
       isSelected: React.PropTypes.bool.isRequired,
       good: React.PropTypes.shape({
                title: React.PropTypes.string.isRequired,
                price: React.PropTypes.string.isRequired,
                url: React.PropTypes.string.isRequired,
                quantity: React.PropTypes.number.isRequired
       })
    },

    selectRow: function(ev) {
        ev.stopPropagation();
        this.props.cbSelect(ev.target.parentNode.dataset.id)
    },

    deleteRow: function(ev) {
        ev.stopPropagation();
        if (confirm('Are You sure?')) this.props.cbDelete(ev.target.dataset.id);
    },

    render: function () {
        return React.DOM.tr( {'data-id': this.props.good.code, onClick: this.selectRow, className: (this.props.isSelected) ? 'focused' : null},
                    React.DOM.td( null, this.props.good.title),
                    React.DOM.td( null, this.props.good.price),
                    React.DOM.td( {className:'url'}, 
                        React.DOM.a( {href: this.props.good.url}, this.props.good.url)),
                    React.DOM.td( null, this.props.good.quantity),
                    React.DOM.td( null,
                        React.DOM.button({'data-id': this.props.good.code, onClick: this.deleteRow }, 'DELETE')
        ));
    }
});