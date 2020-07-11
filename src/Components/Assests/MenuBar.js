import React from 'react';
import Svg, {Path} from 'react-native-svg';

function Menu(props) {
  return (
    <Svg
      fill={props.color}
      viewBox="0 0 24 24"
      width={20}
      height={20}
      {...props}>
      <Path d="M0 2v2h24V2zm0 9v2h24v-2zm0 9v2h24v-2z" />
    </Svg>
  );
}

export default Menu;
