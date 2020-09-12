import React from 'react';
import styled from 'styled-components';
import {Dimensions, TextInput, Modal, Alert} from 'react-native';
import BackNavbar from '../BackNavbar/BackNavbar';
import {useDispatch, useSelector} from 'react-redux';
import {addMemories} from '../../Actions/memories';
import Loader from '../Loader/LoaderScreen';
import {ADD_MEMORIES} from '../../Actions/types';
import Message from '../Message/Message';
import Camera from '../Assests/Camera';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import {set} from 'react-native-reanimated';

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
  color: #ffffff;
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

const ImageContainer = styled.TouchableOpacity`
  flex-direction: row;
`;
const ImageContainer1 = styled.View`
  flex-direction: row;
`;
const Image = styled.Image`
  width: 70px;
  height: 70px;
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 5px;
`;

const CameraContainer = styled.TouchableOpacity`
  margin-top: 10px;
`;

const options = {
  title: 'Please choose your image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
const primaryId =
  new Date(Date.now()).getDate() +
  Math.floor(Math.random() * 10000000) +
  monthNames[new Date(Date.now()).getMonth()] +
  new Date(Date.now()).getFullYear();

function Create() {
  const [value, onChangeText] = React.useState(null);

  const [value1, onChangeText1] = React.useState(null);
  const [imagesPath, setImagesPath] = React.useState([]);
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

  const deleteImage = path => {
    let copyOfImages = [...imagesPath];
    //consolelog(copyOfImages);
    let filter = copyOfImages.filter(image => image.path !== path);
    setImagesPath(filter);
  };

  const addMemo = () => {
    if (value !== '' && value1 !== '' && value !== null && value1 !== null) {
      let data = {
        primaryId: primaryId,
        title: value,
        desc: value1,
        like: 0,
        day: new Date(Date.now()).getDate(),
        month: monthNames[new Date(Date.now()).getMonth()],
        year: new Date(Date.now()).getFullYear(),
        imagePath: '',
        audioPath: '',
        imagesPaths: imagesPath,
      };
      dispatch(addMemories(data));
      setImagesPath([]);
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
  const openImagePicker = () => {
    ImagePicker.launchImageLibrary(options, response1 => {
      //consolelog(response1);
      copy(response1.uri, response1.fileName);
    });
  };
  const copy = (source, fileName) => {
    const imagePath = `${RNFS.ExternalDirectoryPath}/${fileName}`.replace(
      /:/g,
      '-',
    );
    let imageData = {
      memoriesId: primaryId,
      path: imagePath,
    };

    RNFS.copyFile(source, imagePath)
      .then(res => {
        setImagesPath([...imagesPath, imageData]);
      })
      .catch(err => {
        //consolelog('ERROR: image file write failed!!!');
        //consolelog(err.message, err.code);
      });
  };
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
                  marginTop: 30,
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
              <CameraContainer onPress={() => openImagePicker()}>
                <Camera />
              </CameraContainer>

              {!loader.loader[ADD_MEMORIES] === true ? (
                <Button onPress={() => addMemo()}>
                  <Text1>Save</Text1>
                </Button>
              ) : (
                <Loader color="#03a9f4" size="large" />
              )}
              <ScrollView horizontal>
                {imagesPath.map((image, index) => (
                  <ImageContainer
                    key={index}
                    onPress={() => deleteImage(image.path)}>
                    <Image
                      source={{uri: `file://${image.path}`}}
                      style={{
                        shadowOffset: {width: 0, height: 10},
                        shadowColor: '#adadad',
                        shadowOpacity: 0.61,
                        shadowRadius: 24,
                      }}
                    />
                  </ImageContainer>
                ))}
              </ScrollView>
            </>
          )}
        </ModalContainer>
      </Modal>
    </>
  );
}

export default Create;
