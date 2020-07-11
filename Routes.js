import React, {useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/Components/HomeScreen/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/Components/SpalshScreen/SplashScreen';
import Auth from './src/Components/AuthScreen/AuthScreen';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentUser} from './src/Actions/auth';
import Drawer from './src/Components/Drawer/Drawer';
import ViewPage from './src/Components/ViewPage/ViewPage';

const Routes = () => {
  const AuthNavigator = createStackNavigator();
  const HomeNavigator = createDrawerNavigator();
  const ViewNavigator = createStackNavigator();
  const MainNavigator = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    isSignedIn();
  }, []);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      dispatch(setCurrentUser(currentUser));
      setIsLoading(false);
    } else {
      dispatch(setCurrentUser(undefined));
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <SplashScreen />;
  }
  const ViewScreen = () => {
    return (
      <ViewNavigator.Navigator>
        <ViewNavigator.Screen
          name="View1"
          component={ViewPage}
          options={{headerShown: false}}
        />
      </ViewNavigator.Navigator>
    );
  };

  return (
    <>
      <NavigationContainer>
        {auth.isAuthenticated ? (
          <HomeNavigator.Navigator
            drawerContent={props => <Drawer {...props} />}
            initialRouteParams="Home">
            <HomeNavigator.Screen name="Home" component={HomeScreen} />
            <HomeNavigator.Screen name="View" component={ViewScreen} />
          </HomeNavigator.Navigator>
        ) : (
          <AuthNavigator.Navigator>
            <AuthNavigator.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false}}
            />
          </AuthNavigator.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default Routes;
