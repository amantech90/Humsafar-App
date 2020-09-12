import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import BackNavbar from '../BackNavbar/BackNavbar';
import {Modal} from 'react-native';
import Clock from '../Assests/Clock';
import Notification from '../../NativeModules/Notification';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from '../../NativeModules/Toast';
import {useSelector, useDispatch} from 'react-redux';
import RNCalendarEvents from 'react-native-calendar-events';
import {addReminder, getReminder} from '../../Actions/reminder';

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
  const userInfo = useSelector(state => state.auth);
  const reminder = useSelector(state => state.reminder);
  useEffect(() => {
    dispatch(getReminder());
  }, []);
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);

  const selectTime = time => {
    let startDate = new Date(time.nativeEvent.timestamp).toISOString();
    let endDate = new Date(
      new Date(startDate).setFullYear(new Date().getFullYear() + 1),
    ).toISOString();
    //consolelog(startDate);
    //consolelog(endDate);
    RNCalendarEvents.authorizationStatus().then(data => {
      //consolelog(data);
    });
    RNCalendarEvents.authorizeEventStore().then(data => {
      //consolelog(data, 'djo');
    });
    let calendar = {
      id: 'Humsafar_Reminder_1',
      title: 'Add your memories',
      color: '#03a9f4',
      type: 'reminder',
      accessLevel: 'owner',
      startDate: new Date(startDate),
      name: 'Humsafar',
      recurrence: 'daily',
      description: `It's time to add your wonderful memories in humsafar`,
      source: {
        name: userInfo.user.user.name,
        isLocalAccount: true,
      },

      ownerAccount: userInfo.user.user.email,
    };
    RNCalendarEvents.saveCalendar(calendar).then(calenderId => {
      RNCalendarEvents.saveEvent(calendar.title, {
        calendarId: calenderId,
        startDate: startDate,
        recurrenceRule: {
          frequency: 'daily',
          endDate: endDate,
        },
        alarms: [
          {
            date: startDate,
          },
        ],
      }).then(eventId => {
        let data = {
          time: startDate,
          calendarId: calenderId,
          eventId: eventId,
        };
        dispatch(addReminder(data));
        props.BackFunc();
      });
    });
    setShow(false);
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
        {!reminder ? (
          <Button onPress={() => selectTime()}>
            <ButtonText>Add Reminder to your calender</ButtonText>
          </Button>
        ) : (
          <Text2>
            Reminder is already set for every day at {'\n'}
            {new Date(reminder.reminder.time).getHours()} :
            {new Date(reminder.reminder.time).getMinutes()}
          </Text2>
        )}
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
