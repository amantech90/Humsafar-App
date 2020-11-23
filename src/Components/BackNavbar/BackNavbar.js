import React, {useState} from 'react';
import styled from 'styled-components';
import Arrow from '../Assests/Arrow';
import Update from '../Update/Update';
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
  const Button = styled.TouchableOpacity`
    padding: 10px 20px;
    background-color: #03a9f4;
    color: #fff;
    width: 150px;
    border-radius: 50px;
    margin: 0 auto;
    position: absolute;
    right: 0;
  `;
  const Text1 = styled.Text`
    color: #fff;
    font-family: Ubuntu-Light;
    text-align: center;
  `;
  const [modalVisible, setModalVisible] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  let details = {};
  if (props.update) {
    details = {
      title: props.postTitle,
      desc: props.desc,
      images: props.images,
      primaryId: props.primaryId,
    };
  }
  const openModal = () => {
    setModalVisible(true);
    setShowUpdate(true);
  };
  const backFunction = () => {
    setModalVisible(false);
    setShowUpdate(false);
  };
  return (
    <Container>
      <ArrowContainer onPress={() => props.Back()}>
        <Arrow />
      </ArrowContainer>
      <Title>{props.title}</Title>
      {props.update ? (
        <Button onPress={() => openModal()}>
          <Text1>Edit</Text1>
        </Button>
      ) : null}
      {showUpdate ? (
        <Update
          details={details}
          modalVisible={modalVisible}
          backFunction={() => backFunction()}
        />
      ) : null}
    </Container>
  );
};

export default BackNavbar;
