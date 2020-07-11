import React from 'react';
import styled from 'styled-components';
import Emoticon from '../Assests/Emoticon';
const Container = styled.View`
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: Ubuntu-Light;
`;
const Text1 = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  font-family: Ubuntu-Light;
`;
const Message = () => {
  return (
    <Container>
      <Emoticon />
      <Text>WoW! you have already written {'\n'} your today's memories!</Text>
      <Text1>Please come back tomorrow {'\n'} to add more memories.</Text1>
    </Container>
  );
};

export default Message;
