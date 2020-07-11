import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import Exit from '../Assests/exit';
import {GoogleSignin} from '@react-native-community/google-signin';
import {setCurrentUser} from '../../Actions/auth';
const Container = styled.View`
  background-color: #fff;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;
const Title = styled.Text`
  font-size: 16px;
  font-family: Ubuntu-Regular;
  text-transform: capitalize;
  margin-top: 10px;
`;
const SubTitle = styled.Text`
  font-size: 14px;
  font-family: Ubuntu-Light;
  margin-top: 5px;
`;
const Image = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
`;
const TopContainer = styled.View`
  align-items: center;
`;
const Text = styled.Text`
  font-size: 16px;
  font-family: Ubuntu-Light;
  text-transform: capitalize;
  margin-top: 10px;
  color: #808080;
`;
const BottomContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #f5f5f5;
  width: 100%;
  justify-content: center;
`;
const ContainerButton = styled.View`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;
const Drawer = ({navigation}) => {
  const userInfo = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const signOut = () => {
    GoogleSignin.revokeAccess();
    dispatch(setCurrentUser(undefined));
    navigation.toggleDrawer();
  };
  return (
    <Container>
      <TopContainer>
        <Image
          source={{
            uri: userInfo.user.user.photo,
          }}
        />
        <Title>{userInfo.user.user.name}</Title>
        <SubTitle>{userInfo.user.user.email}</SubTitle>
      </TopContainer>
      <BottomContainer onPress={() => signOut()}>
        <ContainerButton>
          <Exit />
        </ContainerButton>
        <Text>Signout</Text>
      </BottomContainer>
    </Container>
  );
};

export default Drawer;
