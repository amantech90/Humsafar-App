import React, {useEffect} from 'react';
import styled from 'styled-components';
import GridIcon from '../Assests/Grid';
import ListIcon from '../Assests/MenuBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import Card from '../Card/Card';
import List from '../List/List';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMonthWiseMemories} from '../../Actions/memories';
import {GET_MONTH_WISE_MEMORIES} from '../../Actions/types';
import Loader from '../Loader/LoaderScreen';

const Container = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #03a9f4;
  color: #fff;
  width: 100px;
  border-radius: 50px;
`;

const Text = styled.Text`
  color: #808080;
  font-family: Ubuntu-Light;
  text-align: center;
`;

const GridContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
`;

const ActionBar = props => {
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
  let getMonthName = new Date(Date.now()).getMonth();
  const [selectedValue, setSelectedValue] = React.useState(
    monthNames[getMonthName],
  );
  const [modeType, setModeType] = React.useState('Grid');
  const memories = useSelector(state => state.memories);
  const loader = useSelector(state => state.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMonthWiseMemories(selectedValue));
  }, [selectedValue]);
  const renderCards = (data, i) => {
    return <Card key={data.primaryId} item={data.item} />;
  };
  const renderList = (data, i) => {
    return <List key={data.primaryId} item={data.item} />;
  };

  if (loader.loader[GET_MONTH_WISE_MEMORIES]) {
    return (
      <Container>
        <Loader color="#03a9f4" size="large" />
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, color: '#808080'}}
          onValueChange={itemValue => setSelectedValue(itemValue)}>
          {monthNames.map(month => (
            <Picker.Item label={month} value={month} key={month} disabled />
          ))}
        </Picker>
        <GridContainer>
          <TouchableOpacity onPress={() => setModeType('Grid')}>
            <GridIcon color={modeType === 'Grid' ? '#03a9f4' : '#808080'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModeType('List')}>
            <ListIcon color={modeType === 'List' ? '#03a9f4' : '#808080'} />
          </TouchableOpacity>
        </GridContainer>
      </Container>
      {memories.memories.length > 0 ? (
        modeType === 'Grid' ? (
          <FlatList
            key={1}
            renderItem={renderCards}
            data={memories.memories}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <FlatList
            key={2}
            renderItem={renderList}
            data={memories.memories}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        )
      ) : (
        <Text>No memories here!</Text>
      )}
      {}
    </>
  );
};
export default ActionBar;
