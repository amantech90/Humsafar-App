import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function Search(props) {
  return (
    <Svg viewBox="0 0 74.85 74.85" {...props}>
      <G data-name="Layer 2">
        <Path
          d="M31.09.5A30.59 30.59 0 1051 54.24l20 19.9L74.14 71l-19.9-20A30.55 30.55 0 0031.09.5z"
          fill="none"
          stroke="#000"
          strokeMiterlimit={10}
          data-name="Layer 1"
        />
      </G>
    </Svg>
  );
}

export default Search;
