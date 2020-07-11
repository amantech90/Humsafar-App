import React from 'react';
import Svg, {Path} from 'react-native-svg';

function Bell(props) {
  return (
    <Svg viewBox="0 0 30 30" width={30} height={30} {...props} fill="#808080">
      <Path d="M15 3a2 2 0 00-2 2v.293A7 7 0 008 12v2.758A10.24 10.24 0 015 22a1 1 0 00-1 1 1 1 0 001 1h9.059A8.935 8.935 0 0114 23c0-4.632 3.501-8.443 8-8.941V12a7 7 0 00-5-6.707V5a2 2 0 00-2-2zm8 13a7 7 0 100 14 7 7 0 000-14zm0 3a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2h-2a1 1 0 110-2h2v-2a1 1 0 011-1zm-11 7a3 3 0 003 3c.392 0 .764-.08 1.107-.217A8.972 8.972 0 0114.523 26H12z" />
    </Svg>
  );
}

export default Bell;
