import * as React from 'react';
import Svg, {RadialGradient, Stop, Circle, Path} from 'react-native-svg';

function Emoticon(props) {
  return (
    <Svg viewBox="0 0 48 48" width={100} height={100} {...props}>
      <RadialGradient
        id="prefix__a"
        cx={24}
        cy={24}
        r={18}
        fx={23.905}
        fy={16.289}
        gradientTransform="matrix(-1 0 0 1 48 0)"
        gradientUnits="userSpaceOnUse">
        <Stop offset={0} stopColor="#ffe16e" />
        <Stop offset={0.629} stopColor="#ffd226" />
        <Stop offset={0.75} stopColor="#fdcd23" />
        <Stop offset={0.899} stopColor="#f6bd1b" />
        <Stop offset={0.999} stopColor="#f0af13" />
      </RadialGradient>
      <Circle cx={24} cy={24} r={18} fill="url(#prefix__a)" />
      <RadialGradient
        id="prefix__b"
        cx={36}
        cy={27}
        r={5}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0} stopColor="#ff8400" stopOpacity={0.6} />
        <Stop offset={0.999} stopColor="#ff8400" stopOpacity={0} />
      </RadialGradient>
      <Circle cx={36} cy={27} r={5} fill="url(#prefix__b)" />
      <RadialGradient
        id="prefix__c"
        cx={12}
        cy={27}
        r={5}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0} stopColor="#ff8400" stopOpacity={0.6} />
        <Stop offset={0.999} stopColor="#ff8400" stopOpacity={0} />
      </RadialGradient>
      <Circle cx={12} cy={27} r={5} fill="url(#prefix__c)" />
      <RadialGradient
        id="prefix__d"
        cx={29.166}
        cy={18.794}
        r={7.026}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.001} stopColor="#ff634f" />
        <Stop offset={0.628} stopColor="#ee4023" />
        <Stop offset={1} stopColor="#e62f0e" />
      </RadialGradient>
      <Path
        fill="url(#prefix__d)"
        d="M35.092 18.087c-1.416-.587-2.773-.034-2.773-.034s-.563-1.348-1.985-1.937a3.091 3.091 0 00-4.038 1.672C24.877 21.215 29.027 26 29.027 26s6.318-.449 7.737-3.875a3.091 3.091 0 00-1.672-4.038z"
      />
      <RadialGradient
        id="prefix__e"
        cx={14.916}
        cy={19.43}
        r={7.056}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.001} stopColor="#ff634f" />
        <Stop offset={0.628} stopColor="#ee4023" />
        <Stop offset={1} stopColor="#e62f0e" />
      </RadialGradient>
      <Path
        fill="url(#prefix__e)"
        d="M12.908 18.087c1.416-.587 2.773-.034 2.773-.034s.563-1.348 1.985-1.937a3.091 3.091 0 014.038 1.672C23.123 21.215 18.973 26 18.973 26s-6.318-.449-7.737-3.875a3.091 3.091 0 011.672-4.038z"
      />
      <RadialGradient
        id="prefix__f"
        cx={134.219}
        cy={30.497}
        r={5.456}
        fx={134.215}
        fy={30.701}
        gradientTransform="matrix(1.9165 0 0 1.0383 -233.232 -1.339)"
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.947} stopColor="#ffe16e" />
        <Stop offset={1} stopColor="#ffe16e" stopOpacity={0} />
      </RadialGradient>
      <Path
        fill="url(#prefix__f)"
        d="M32.642 30S30.646 35 24 35c-6.156 0-8.637-5-8.637-5s1.627 2.305 8.72 2.305S32.642 30 32.642 30z"
      />
      <RadialGradient
        id="prefix__g"
        cx={6.843}
        cy={28.488}
        r={8.479}
        gradientTransform="matrix(1.0924 0 0 1.1169 16.629 -4.326)"
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.819} stopColor="#cc9000" />
        <Stop offset={0.988} stopColor="#fbbc23" stopOpacity={0.069} />
        <Stop offset={1} stopColor="#ffbf26" stopOpacity={0} />
      </RadialGradient>
      <Path
        fill="url(#prefix__g)"
        d="M24 35c-6.815 0-9.227-5.819-9.227-5.819S15.923 37 24 37s9.227-7.819 9.227-7.819S30.815 35 24 35z"
      />
      <RadialGradient
        id="prefix__h"
        cx={24}
        cy={29.843}
        r={9.652}
        gradientTransform="matrix(1 0 0 .3754 0 18.64)"
        gradientUnits="userSpaceOnUse">
        <Stop offset={0} stopColor="#1c1911" />
        <Stop offset={0.999} stopColor="#171714" />
      </RadialGradient>
      <Path
        fill="url(#prefix__h)"
        d="M32.378 28.788c.455-.38 1.076.215.717.687C31.453 31.634 28.603 34 24 34s-7.453-2.366-9.095-4.525c-.359-.472.262-1.067.717-.687C17.501 30.355 20.344 32 24 32s6.499-1.645 8.378-3.212z"
      />
    </Svg>
  );
}

export default Emoticon;
