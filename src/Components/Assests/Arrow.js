import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function Arrow(props) {
  return (
    <Svg viewBox="0 0 81.02 55.81" {...props} width="25" height="25">
      <G data-name="Layer 2">
        <Path
          d="M43.13 55.81l.16-15.41 37.47.39.26-25-37.47-.39.17-15.4L0 27.45z"
          fill="#666"
          data-name="Layer 1"
        />
      </G>
    </Svg>
  );
}

export default Arrow;
