import React from 'react';
import styled from 'styled-components/native';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import ActionBar from '../Action/Action';
import Create from '../CreateButton/Create';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const Button = styled.TouchableOpacity`
  padding: 15px 50px;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 50px;
`;
const Text = styled.Text`
  color: #fff;
  font-family: Ubuntu-Light;
`;
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px 20px;
  height: ${windowHeight}px;
`;
const HomeScreen = ({navigation}) => {
  return (
    <>
      <Container>
        <Navbar toggle={() => navigation.toggleDrawer()} />
        <Search />

        <ActionBar navigation={navigation} />

        {/* <Button onPress={signOut}>
        <Text>SignOut</Text>
      </Button> */}
      </Container>
      <Create />
    </>
  );
};

export default HomeScreen;
