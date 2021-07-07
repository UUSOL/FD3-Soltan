import React from 'react';
import './withRainbowFrame.css';

export const withRainbowFrameHOC = colors => Component => props => {
    return (
        <div className='WithRainbowFrame'>
            { colors.reduce((prevDiv, color) => <div style={{borderColor: color}}>{prevDiv}</div>, 
                <Component {...props} /> ) }
        </div>
    );
}  