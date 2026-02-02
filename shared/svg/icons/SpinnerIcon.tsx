import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const SpinnerIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G stroke="#fff" strokeLinecap="round" strokeWidth={1.5}>
      <Path d="M4.975 12H7.9M11.8 5v3M18.625 12H15.7M11.8 19v-3M6.974 16.95l2.068-2.121M6.974 7.05l2.068 2.121M16.626 7.05l-2.068 2.121M16.626 16.95l-2.068-2.121" />
    </G>
  </Svg>
);
export default SpinnerIcon;
