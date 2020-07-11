import React from 'react';
import styled from 'styled-components/native';
import Loader from '../Loader/LoaderScreen';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const Logo = styled.Text`
  color: #03a9f4;
  font-size: 40px;
  margin-bottom: 10px;
  font-family: Ubuntu-Bold;
`;
const SplashScreen = () => {
  return (
    <Container>
      <Logo>Humsafar</Logo>
      <Loader color="#03a9f4" size="large" />
    </Container>
  );
};

export default SplashScreen;
