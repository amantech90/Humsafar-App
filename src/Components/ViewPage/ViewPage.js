import React from 'react';
import styled from 'styled-components';
import BackNavbar from '../BackNavbar/BackNavbar';
const Container = styled.View`
  flex: 1;
  background: #ffffff;
  padding: 20px;
`;
const ViewContainer = styled.View``;
const Title = styled.Text`
  font-size: 18px;
  font-family: Ubuntu-Regular;
  margin-bottom: 5px;
`;
const Date = styled.Text`
  font-size: 12px;
  font-family: Ubuntu-Light;
  color: #808080;
  margin-bottom: 20px;
`;
const Desc = styled.Text`
  font-size: 16px;
  font-family: Ubuntu-Light;
`;
const ViewPage = ({route, navigation}) => {
  //   console.log(route, 'state');
  const {title, desc, day, month, year} = route.params.user;
  return (
    <Container>
      <BackNavbar Back={() => navigation.goBack()} title="Back" />
      <ViewContainer>
        <Title>{title}</Title>
        <Date>{`${day > 10 ? day : `0${day}`}-${month}-${year}`}</Date>
        <Desc>{desc}</Desc>
      </ViewContainer>
    </Container>
  );
};
export default ViewPage;
