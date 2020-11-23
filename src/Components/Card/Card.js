import React from 'react';
import styled from 'styled-components';
import {Dimensions} from 'react-native';
import Heart from '../Assests/Heart';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {getPhotos, togglelikeMemories} from '../../Actions/memories';
import {useNavigation} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Card = props => {
  const Container = styled.View`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 8px;
    width: ${windowWidth / 2 - 30}px;
    height: 250px;
    justify-content: space-between;
  `;
  const TopHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    margin-bottom: 0px;
  `;
  const Title = styled.Text`
    font-size: 10px;
    color: #292929;
    font-family: Ubuntu-Bold;
    margin-bottom: 10px;
  `;
  const SubTitle = styled.Text`
    font-size: 9px;
    color: #292929;
    font-family: Ubuntu-Light;
    margin-bottom: 10px;
  `;
  const Button = styled.TouchableOpacity`
    padding: 5px;
    background-color: #03a9f4;
    color: #fff;
    width: 100px;
    border-radius: 50px;
  `;
  const DateContainer = styled.View`
    background-color: #03a9f4;
    border-radius: 30px;
    height: 30px;
    width: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;
  `;
  const Date = styled.Text`
    color: #fff;
    font-family: Ubuntu-Light;
    font-size: 9px;
  `;
  const Text = styled.Text`
    color: #fff;
    font-family: Ubuntu-Light;
    text-align: center;
  `;
  const ButtonContainer = styled.View`
    justify-content: center;
    align-items: center;
  `;
  const BodyContainer = styled.View``;
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
    dispatch(getPhotos(item.primaryId));
    navigation.navigate('View', {user: item});
  };

  const {item} = props;

  return (
    <>
      <Container
        style={{
          elevation: 4,
          shadowOffset: {width: 0, height: 10},
          shadowColor: '#adadad',
          shadowOpacity: 0.61,
          shadowRadius: 24,
        }}>
        <BodyContainer>
          <TopHeader>
            <DateContainer>
              <Date>{item.day > 10 ? item.day : `0${item.day}`}</Date>
            </DateContainer>
            <TouchableOpacity onPress={() => toggleLike(item)}>
              <Heart
                width={30}
                height={30}
                color={item.like === 1 ? '#FF0000' : '#808080'}
              />
            </TouchableOpacity>
          </TopHeader>

          <Title>
            {item.title.length > 40
              ? `${item.title.substring(0, 40)}...`
              : item.title}
          </Title>
          <SubTitle>
            {item.desc.length > 100
              ? `${item.desc.substring(0, 100)}...`
              : item.desc}
          </SubTitle>
        </BodyContainer>

        <ButtonContainer>
          <Button onPress={() => goToViewPage(item)}>
            <Text>View</Text>
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default Card;
