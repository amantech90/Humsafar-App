import React, {useEffect} from 'react';
import styled from 'styled-components';
import {TextInput, Modal, FlatList, ListItem} from 'react-native';
import SearchIcon from '../Assests/Search';
import BackNavbar from '../BackNavbar/BackNavbar';
import {useDispatch, useSelector} from 'react-redux';
import {getAllMemories} from '../../Actions/memories';
import {useNavigation} from '@react-navigation/native';
const Container = styled.View`
  margin-top: 30px;
`;
const SearchContainer = styled.TouchableOpacity`
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;
const SearchBox = styled.View`
  width: 50px;
  margin-right: 15px;
`;
const Text = styled.Text`
  color: #808080;
  font-family: Ubuntu Light;
`;
const Text1 = styled.Text`
  font-size: 20px;
  font-family: Ubuntu Light;
`;
const ModalContainer = styled.View`
  background-color: #ffffff;
  padding: 20px;
  flex: 1;
`;
const ListContainer = styled.TouchableOpacity`
  margin-top: 10px;
  border: 1px solid #f5f5f5;
  padding: 10px;
  border-radius: 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: Ubuntu-Regular;
  margin-bottom: 5px;
`;
const Date = styled.Text`
  font-size: 12px;
  font-family: Ubuntu-Light;
  color: #808080;
  margin-bottom: 10px;
`;
const Desc = styled.Text`
  font-size: 16px;
  font-family: Ubuntu-Light;
`;
const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Search = () => {
  const [value, onChangeText] = React.useState(null);
  const [isTouched, setIsTouched] = React.useState(false);
  const [searchArray, setSearchArray] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isTextInputChecked, setTextInputChecked] = React.useState(false);
  const memories = useSelector(state => state.memories);
  const dispatch = useDispatch();
  const blur = () => {
    setTextInputChecked(true);
  };
  useEffect(() => {
    dispatch(getAllMemories());
  }, [memories.memories]);

  const BackFunc = () => {
    setModalVisible(false);
    setTextInputChecked(false);
    setSearchArray(null);
    setIsTouched(false);
  };
  const searchFilterFunction = text => {
    setIsTouched(true);
    if (text.trim() !== '') {
      const newData = memories.searchedMemories.filter(item => {
        const itemData = `${item.desc.toUpperCase()}   
        ${item.title.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setSearchArray(newData);
    } else {
      setIsTouched(false);
      setSearchArray(null);
    }
  };
  const searchText = text => {
    onChangeText(text);
    dispatch(searchMemories(text));
  };
  // console.log(searchArray);
  let list = (
    <TextContainer>
      <Text1>Search your memories</Text1>
    </TextContainer>
  );
  if (isTouched && searchArray.length > 0) {
    list = searchArray.map(search => (
      <ListContainer
        key={search.primaryId}
        onPress={() => goToViewPage(search)}>
        <Title>{search.title}</Title>
        <Date>{`${search.day > 10 ? search.day : `0${search.day}`}-${
          search.month
        }-${search.year}`}</Date>
        <Desc>{search.desc}</Desc>
      </ListContainer>
    ));
  } else if (isTouched && searchArray.length == 0) {
    list = (
      <TextContainer>
        <Text1>No memories is found!</Text1>
      </TextContainer>
    );
  }
  const navigation = useNavigation();
  const goToViewPage = item => {
    navigation.navigate('View', {screen: 'View1', params: {user: item}});
    BackFunc();
  };
  return (
    <>
      <Container>
        <SearchContainer onPress={() => setModalVisible(true)}>
          <SearchBox>
            <SearchIcon />
          </SearchBox>
          <Text>Search your memories</Text>
        </SearchContainer>
      </Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => BackFunc()}>
        <ModalContainer>
          <BackNavbar Back={() => BackFunc()} title="Back" />
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
            onChangeText={text => searchFilterFunction(text)}
            onFocus={() => blur()}
            autoFocus={true}
            placeholder="Search your memories"
          />
          {list}
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Search;
