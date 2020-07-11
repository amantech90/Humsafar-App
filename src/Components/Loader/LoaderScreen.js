import React from 'react';
import {ActivityIndicator} from 'react-native';
const Loader = props => {
  return (
    <>
      <ActivityIndicator color={props.color} size={props.size} />
    </>
  );
};

export default Loader;
