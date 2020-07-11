import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Routes from './Routes';
import {GoogleSignin} from '@react-native-community/google-signin';
import {AppRegistry} from 'react-native';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '479487650977-ube0ihktrl3lonea9r91oguch14r7ksl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  // const backupOfDb = () => {
  //   RNFS.readFile(
  //     '/data/data/com.wishbirds.humsafar/databases/Humsafar.db',
  //     'base64',
  //   ).then(value =>
  //     RNFS.getAllExternalFilesDirs()
  //       .then(path => {
  //         return RNFS.writeFile(
  //           path + '/' + 'Humsafar_copy.db',
  //           value,
  //           'base64',
  //         );
  //       })
  //       .then(data => console.log(data, 'Successful')),
  //   );
  // };
  // const GDriveInit = async () => {
  //   let accessToken = info.idToken ? info.idToken : null;
  //   console.log(accessToken, 'du');
  //   if (accessToken) {
  //     GDrive.setAccessToken(accessToken);
  //     GDrive.init();
  //     console.log(GDrive.isInitialized());
  //     if (GDrive.isInitialized()) {
  //       RNFS.readFile(
  //         '/storage/emulated/0/Android/data/com.wishbirds.humsafar/files/Humsafar_copy.db',
  //         'base64',
  //       ).then(data => {
  //         console.log(GDrive.files);
  //         GDrive.files
  //           .createFileMultipart(
  //             data,
  //             'application/x-sqlite3',
  //             {
  //               parents: ['root'],
  //               name: 'Humsafar',
  //             },
  //             true,
  //           )
  //           .then(data => console.log(data));
  //       });
  //     }
  //   } else {
  //     console.log('nop no');
  //   }
  // };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Routes />
    </>
  );
};

const NotificationService = async data => {
  console.log(data, 'notification');
};

AppRegistry.registerHeadlessTask('Noti', () => NotificationService);

export default App;
