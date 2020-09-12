import React, {useState} from 'react';
import styled from 'styled-components/native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '../../Actions/auth';
import Loader from '../Loader/LoaderScreen';
import Toast from '../../NativeModules/Toast';
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const Button = styled.TouchableOpacity`
  padding: 15px 50px;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 50px;
`;
const Logo = styled.Text`
  color: #03a9f4;
  font-size: 40px;
  margin-bottom: 40px;
  font-family: Ubuntu-Bold;
`;
const Text = styled.Text`
  color: #fff;
  font-family: Ubuntu-Light;
`;
const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const googleSigin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setIsLoading(true);
      const userInfo = await GoogleSignin.signIn();

      setIsLoading(false);
      Toast.show('Successfully login!', Toast.SHORT);
      dispatch(setCurrentUser(userInfo));
    } catch (error) {
      //consolelog(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch(setCurrentUser(undefined));
        setIsLoading(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        dispatch(setCurrentUser(undefined));
        //consolelog('error occured IN_PROGRESS');
        Toast.show('error occured IN_PROGRESS', Toast.SHORT);
        setIsLoading(false);

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        dispatch(setCurrentUser(undefined));
        setIsLoading(false);
        //consolelog('error occured PLAY_SERVICES_NOT_AVAILABLE');
        Toast.show('error occured PLAY_SERVICES_NOT_AVAILABLE', Toast.SHORT);
        // play services not available or outdated
      } else {
        dispatch(setCurrentUser(undefined));
        setIsLoading(false);
        //consolelog('error occured unknow error');
        Toast.show('error occured unknow error', Toast.SHORT);
        // some other error happened
      }
    }
  };
  if (isLoading) {
    return (
      <Container>
        <Loader color="#03a9f4" size="small" />
      </Container>
    );
  }
  return (
    <Container>
      <Logo>Humsafar</Logo>
      <Button onPress={googleSigin}>
        <Text>Sign up with google</Text>
      </Button>
    </Container>
  );
};

export default Auth;
