import React, {useState} from 'react';
import styled from 'styled-components';
import MenuBar from '../Assests/MenuBar';
import Bell from '../Assests/Bell';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Reminder from '../Reminder/Reminder';

const Container = styled.View`
  flex-direction: row;
`;
const NavContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
const Logo = styled.Text`
  color: #03a9f4;
  font-size: 20px;
  font-family: Ubuntu-Bold;
`;
const Navbar = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const trueModal = () => {
    setModalVisible(true);
  };
  BackFunc = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Container>
        <NavContainer>
          <TouchableOpacity onPress={props.toggle}>
            <MenuBar color="#808080" />
          </TouchableOpacity>
          <Logo>Humsafar</Logo>
          {/* <TouchableOpacity onPress={() => trueModal()}>
            <Bell />
          </TouchableOpacity> */}
        </NavContainer>
      </Container>
      {/* <Reminder modalVisible={modalVisible} BackFunc={() => BackFunc()} /> */}
    </>
  );
};

export default Navbar;
