import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Exit(props) {
  return (
    <Svg fill="gray" viewBox="0 0 24 24" width={25} height={25} {...props}>
      <Path d="M6 2c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-4.75l-1.998 1.498V20H6V4h12v3.25l2 1.5V4c0-1.103-.897-2-2-2H6zm10 6.25V11h-5v2h5v2.75L21 12l-5-3.75z" />
    </Svg>
  );
}

export default Exit;
