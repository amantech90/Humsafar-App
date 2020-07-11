import React from 'react';
import styled from 'styled-components';
import {Dimensions, TextInput, Modal, Alert} from 'react-native';
import BackNavbar from '../BackNavbar/BackNavbar';
import {useDispatch, useSelector} from 'react-redux';
import {addMemories} from '../../Actions/memories';
import Loader from '../Loader/LoaderScreen';
import {ADD_MEMORIES} from '../../Actions/types';
import Emoticon from '../Assests/Emoticon';
import Message from '../Message/Message';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  top: ${windowHeight - 100}px;
  right: 10px;
  padding: 10px 20px;
  background-color: #03a9f4;
`;
const Text = styled.Text`
  color: #fff;
  font-family: Ubuntu-Light;
  text-align: center;
  font-size: 20px;
`;
const ModalContainer = styled.View`
  background-color: #ffffff;
  padding: 20px;
  flex: 1;
`;
const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #03a9f4;
  color: #fff;
  width: 150px;
  border-radius: 50px;
  margin: 0 auto;
`;

const Text1 = styled.Text`
  color: #fff;
  font-family: Ubuntu-Light;
  text-align: center;
`;
function Create() {
  const [value, onChangeText] = React.useState(null);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [value1, onChangeText1] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isTextInputChecked, setTextInputChecked] = React.useState(false);
  const [isTextInputChecked1, setTextInputChecked1] = React.useState(false);
  const dispatch = useDispatch();
  const loader = useSelector(state => state.error);
  const memories = useSelector(state => state.memories);
  const blur = () => {
    setTextInputChecked(true);
  };
  const blur1 = () => {
    setTextInputChecked1(true);
  };
  const BackFunc = () => {
    setModalVisible(false);
    setTextInputChecked(false);
    setTextInputChecked1(false);
  };

  const addMemo = () => {
    if (value !== '' && value1 !== '' && value !== null && value1 !== null) {
      let data = {
        primaryId: Math.floor(Math.random() * 10000000),
        title: value,
        desc: value1,
        like: 0,
        day: new Date(Date.now()).getDate(),
        month: monthNames[new Date(Date.now()).getMonth()],
        year: new Date(Date.now()).getFullYear(),
        imagePath: '',
        audioPath: '',
      };
      dispatch(addMemories(data));
      onChangeText(null);
      onChangeText1(null);
      BackFunc();
    } else if (value === '' || value === null) {
      Alert.alert('Fields required', 'Title is required');
    } else if (value1 === '' || value1 === null) {
      Alert.alert('Fields required', 'Memories is required');
    }
  };
  const checkTodayPostExists = memories.memories.filter(
    mem => mem.day === new Date(Date.now()).getDate(),
  );

  return (
    <>
      <Container
        style={{
          elevation: 4,
          shadowOffset: {width: 0, height: 10},
          shadowColor: '#adadad',
          shadowOpacity: 0.61,
          shadowRadius: 24,
        }}
        onPress={() => setModalVisible(true)}>
        <Text>+</Text>
      </Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => BackFunc()}>
        <ModalContainer>
          <BackNavbar Back={() => BackFunc()} title="Back" />
          {checkTodayPostExists.length > 0 ? (
            <Message />
          ) : (
            <>
              <TextInput
                style={{
                  height: 50,
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: isTextInputChecked ? '#fff' : '#f5f5f5',
                  borderWidth: 2,
                  borderColor: isTextInputChecked ? '#03a9f4' : '#f5f5f5',
                }}
                onChangeText={text => onChangeText(text)}
                onFocus={() => blur()}
                placeholder="Title"
              />
              <TextInput
                style={{
                  height: windowHeight - 400,
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginVertical: 30,
                  backgroundColor: isTextInputChecked1 ? '#fff' : '#f5f5f5',
                  borderWidth: 2,
                  borderColor: isTextInputChecked1 ? '#03a9f4' : '#f5f5f5',
                }}
                textAlignVertical="top"
                onChangeText={text => onChangeText1(text)}
                multiline
                numberOfLines={100}
                onFocus={() => blur1()}
                placeholder="Your memories"
              />
              {!loader.loader[ADD_MEMORIES] === true ? (
                <Button onPress={() => addMemo()}>
                  <Text1>Save</Text1>
                </Button>
              ) : (
                <Loader color="#03a9f4" size="large" />
              )}
            </>
          )}
        </ModalContainer>
      </Modal>
    </>
  );
}

export default Create;
