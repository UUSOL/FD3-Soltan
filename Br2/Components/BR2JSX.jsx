import React from 'react';
import './BR2JSX.css';

export default props => {
    const words = props.text.split(/<br>|<br? ?\/>/);
    return (
        <div className="BR2JSX">
            {words.reduce((word1, word2, i) => [...word1, <br key={i}/>, word2], [words.shift()])}
        </div>
    );
}


//////// class version with more explicit solution
/*
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {
  
    static propTypes = {
    	text: PropTypes.string.isRequired,
    }

    buildJSX = () => {
        const result = [];
        this.props.text.split(/<br>|<br? ?\/>/)
                    .forEach((word, i, key=i) => {
                        if (!i == 0) result.push(<br key={i+"b"}/>)
                        result.push(word);
                    });
        return result;
    }

    render(){
        return (
            <div className="BR2JSX">
                {this.buildJSX()}
            </div>
        );
    }
}

export default BR2JSX;
*/