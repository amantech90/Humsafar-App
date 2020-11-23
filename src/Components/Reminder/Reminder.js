import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import BackNavbar from '../BackNavbar/BackNavbar';
import {Modal} from 'react-native';
import Clock from '../Assests/Clock';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from '../../NativeModules/Toast';
import {useSelector, useDispatch} from 'react-redux';

const Container = styled.TouchableOpacity`
  padding: 10px 20px;
`;
const Text = styled.Text`
  font-family: Ubuntu-Regular;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;
const ModalContainer = styled.View`
  background-color: #ffffff;
  align-items: center;
  padding: 20px;
  flex: 1;
`;
const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #03a9f4;
  color: #fff;

  border-radius: 50px;
  margin: 0 auto;
`;

const Text1 = styled.Text`
  font-family: Ubuntu-Light;
  text-align: center;
  margin-bottom: 20px;
`;
const ButtonText = styled.Text`
  font-family: Ubuntu-Light;
  color: #fff;
  text-align: center;
`;
const Text2 = styled.Text`
  font-family: Ubuntu-Right;

  text-align: center;
`;
const Reminder = props => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);

  const selectTime = time => {
    let startDate = new Date(time.nativeEvent.timestamp).toISOString();
    console.log(startDate, 'date');
    // setShow(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => props.BackFunc()}>
      <Container>
        <BackNavbar Back={() => props.BackFunc()} title="Back" />
      </Container>

      <ModalContainer>
        <Clock />
        <Text>Set your reminders!</Text>
        <Text1>
          Please set your reminder time to notify you about to add new memories.
          So that you'll never miss to add memories.
        </Text1>

        <Button onPress={() => setShow(!show)}>
          <ButtonText>Add Reminder to your calender</ButtonText>
        </Button>
      </ModalContainer>

      {show ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={event => selectTime(event)}
        />
      ) : null}
    </Modal>
  );
};

export default Reminder;
