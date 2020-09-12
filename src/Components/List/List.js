import React from 'react';
import styled from 'styled-components';
import Heart from '../Assests/Heart';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {getPhotos, togglelikeMemories} from '../../Actions/memories';
import {useNavigation} from '@react-navigation/native';
const List = props => {
  const Container = styled.TouchableOpacity`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 8px;
    height: 100px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  `;
  const DateContainer = styled.View`
    background-color: #03a9f4;
    border-radius: 30px;
    height: 40px;
    width: 40px;
    text-align: center;
    justify-content: center;
    align-items: center;
  `;
  const Date = styled.Text`
    color: #fff;
    font-family: Ubuntu-Light;
    font-size: 15px;
  `;
  const Title = styled.Text`
    font-size: 14px;
    color: #292929;
    font-family: Ubuntu-Regular;
    margin-left: 20px;
  `;
  const TopHeader = styled.View`
    flex-direction: row;
    align-items: center;
    width: 150px;
    margin-bottom: 0px;
  `;

  const dispatch = useDispatch();
  const toggleLike = item => {
    let data = {
      primaryId: item.primaryId,
      like: item.like === 1 ? 0 : 1,
    };
    dispatch(togglelikeMemories(data));
  };
  const navigation = useNavigation();
  const goToViewPage = item => {
    // //consolelog(item, 'ddhikdh');
    dispatch(getPhotos(item.primaryId));
    navigation.navigate('View', {screen: 'View1', params: {user: item}});
  };
  const {item} = props;
  return (
    <Container
      onPress={() => goToViewPage(item)}
      style={{
        elevation: 4,
        shadowOffset: {width: 0, height: 10},
        shadowColor: '#adadad',
        shadowOpacity: 0.61,
        shadowRadius: 24,
      }}>
      <TopHeader>
        <DateContainer>
          <Date>{item.day > 10 ? item.day : `0${item.day}`}</Date>
        </DateContainer>
        <Title>
          {' '}
          {item.title.length > 40
            ? `${item.title.substring(0, 40)}...`
            : item.title}
        </Title>
      </TopHeader>

      <TouchableOpacity onPress={() => toggleLike(item)}>
        <Heart
          width={30}
          height={30}
          color={item.like === 1 ? '#FF0000' : '#808080'}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default List;
