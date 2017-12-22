import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {List, ListItem} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabIcon:{
    width: 16,
    height: 16,
  },
});


export default class App extends Component {
    state ={
      data:[],
      page:0,
      loading:false
    };

    componentWillMount(){
      this.fetchData();
    }

    fetchData = async () =>{
      this.setState({loading:true});
      const response = await fetch(
         `https://randomuser.me/api?results=15&seed=hi&page=${this.state.page}`
      );

    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json.results],
      loading:false
      }));
    };

    handleEnd =() => {
      this.setState(state =>({page:state.page +1}), () => this.fetchData());
    };

    render(){
      return (
        <View >
        <List>
          <FlatList
            data={this.state.data}
            keyExtractor={(x,i)=>i}
            onEndReached={() => this.handleEnd()}
            onEndReachedThreshold={0}
            ListFooterComponent={()=>
              this.state.loading
              ? null
              : <ActivityIndicator size="large" animating />}
              renderItem={({item}) =>
              <ListItem
                roundAvatar
                avatar={{uri: item.picture.thumbnail}}
                title={`${item.name.first} ${item.name.last}`}
                />}
              />
            </List>
        </View>
        );
      }
}
