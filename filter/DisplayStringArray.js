var DisplayStringArray = React.createClass({

	displayName: "DisplayStringArray",

	propTypes: {
		words: React.PropTypes.arrayOf( React.PropTypes.string.isRequired )
	},

	getInitialState: function() {
		    return { 
		      isChecked: false,
		      inputText: '',
		    };
  	},

  	toggleCheck: function(ev) {
  		this.setState( {isChecked: ev.target.checked});
  	},

  	changeInputText: function(ev) {
  		this.setState( {inputText: ev.target.value} )
  	},

  	resetState: function() {
  		this.setState( this.getInitialState() );
  	},

	render: function() {
		var filteredWords = this.props.words.filter(word => word.includes(this.state.inputText));
		if (this.state.isChecked) filteredWords.sort();

		var toRender = filteredWords.map( word => React.DOM.span( {key: word, className: 'word'}, word) );
		
		return React.DOM.div( {className: 'DisplayStringArray'},
					React.DOM.div( {className: 'user-action'},
								React.DOM.input( {key: this.state.isChecked, type:'checkbox', name:'sort', 
													defaultChecked: this.state.isChecked, onClick: this.toggleCheck}),
				                React.DOM.input( {type:'text', name:'textInput', 
				                					value: this.state.inputText, onChange: this.changeInputText}),
				                React.DOM.input( {type:'button', value: 'сброс', onClick: this.resetState})),
					React.DOM.div( {className: 'output'}, toRender) );
	},
});
