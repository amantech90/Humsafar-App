import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Clock(props) {
  return (
    <Svg viewBox="0 0 24 24" width={100} height={100} {...props} fill="#202020">
      <Path d="M11 2v2.059c-4.49.5-8 4.32-8 8.941 0 4.959 4.041 9 9 9s9-4.041 9-9c0-4.62-3.51-8.441-8-8.941V2h-2zm1 4c3.878 0 7 3.122 7 7s-3.122 7-7 7-7-3.122-7-7 3.122-7 7-7zm-1 2v5.414l3.293 3.293 1.414-1.414L13 12.586V8h-2z" />
    </Svg>
  );
}

export default Clock;
