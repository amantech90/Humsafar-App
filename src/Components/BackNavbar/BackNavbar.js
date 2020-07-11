import React from 'react';
import styled from 'styled-components';
import Arrow from '../Assests/Arrow';
const BackNavbar = props => {
  const Container = styled.View`
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
  `;
  const Logo = styled.Text`
    color: #03a9f4;
    font-size: 20px;
    font-family: Ubuntu-Bold;
  `;
  const ArrowContainer = styled.TouchableOpacity`
    width: 50px;
    background-color: #f5f5f5;
    padding: 15px 10px;
    border-radius: 50px;
  `;
  const Title = styled.Text`
    font-size: 20px;
    font-family: Ubuntu-Regular;
    margin-left: 10px;
  `;
  return (
    <Container>
      <ArrowContainer onPress={() => props.Back()}>
        <Arrow />
      </ArrowContainer>
      <Title>{props.title}</Title>
    </Container>
  );
};

export default BackNavbar;
