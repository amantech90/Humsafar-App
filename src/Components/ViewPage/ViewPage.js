import React, {useEffect} from 'react';
import styled from 'styled-components';
import BackNavbar from '../BackNavbar/BackNavbar';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

const Container = styled.ScrollView`
  flex: 1;
  background: #ffffff;
  padding: 20px;
`;
const ViewContainer = styled.View``;
const Title = styled.Text`
  font-size: 18px;
  font-family: Ubuntu-Regular;
  margin-bottom: 5px;
`;
const Date = styled.Text`
  font-size: 12px;
  font-family: Ubuntu-Light;
  color: #808080;
  margin-bottom: 20px;
`;
const Desc = styled.Text`
  font-size: 16px;
  font-family: Ubuntu-Light;
`;

const ImageContainer = styled.View`
  flex-direction: column;
  margin-bottom: 50px;
`;
const Image = styled.Image`
  width: ${width - 50}px;
  height: ${width - 50}px;
  margin-left: 10px;
  margin-top: 20px;
  border-radius: 5px;
`;

const ViewPage = ({route, navigation}) => {
  //consolelog(width, 'width');
  const {title, desc, day, month, year, primaryId} = route.params.user;
  //consolelog(primaryId, 'primary');
  const memories = useSelector(state => state.memories);
  //consolelog(memories.currentImages, 'vuew page');

  return (
    <Container>
      <BackNavbar Back={() => navigation.goBack()} title="Back" />
      <ViewContainer>
        <Title>{title}</Title>
        <Date>{`${day > 10 ? day : `0${day}`}-${month}-${year}`}</Date>
        <Desc>{desc}</Desc>
        <ImageContainer>
          {memories.currentImages.map((image, index) => (
            <Image
              key={index}
              source={{uri: `file://${image.path}`}}
              style={{
                shadowOffset: {width: 0, height: 10},
                shadowColor: '#adadad',
                shadowOpacity: 0.61,
                shadowRadius: 24,
              }}
            />
          ))}
        </ImageContainer>
      </ViewContainer>
    </Container>
  );
};
export default ViewPage;
