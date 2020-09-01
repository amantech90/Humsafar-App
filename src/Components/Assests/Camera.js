import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Camera(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 30 30" fill="#666" {...props}>
      <Path d="M10 5a1 1 0 00-1 1v1a1 1 0 01-1 1H3a1 1 0 00-1 1v15a1 1 0 001 1h24a1 1 0 001-1V9a1 1 0 00-1-1h-5a1 1 0 01-1-1V6a1 1 0 00-1-1H10zm5 4a7 7 0 110 14 7 7 0 010-14zm10 1a1 1 0 110 2 1 1 0 010-2zm-10 1a5 5 0 00-5 5 5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5z" />
    </Svg>
  );
}

export default Camera;
