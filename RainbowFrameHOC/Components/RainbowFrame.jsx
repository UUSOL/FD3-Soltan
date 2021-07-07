import React from 'react';
import {withRainbowFrameHOC} from './withRainbowFrame.jsx';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let RainbowFrame = props => <div>{props.children}</div>;
RainbowFrame = withRainbowFrameHOC(colors)(RainbowFrame);

export {RainbowFrame};