import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

const Item = ({id, title, selected, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        {backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'},
      ]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [selected, setSelected] = useState(new Map());

  const onSelect = useCallback(
    name => {
      const newSelected = new Map(selected);
      newSelected.set(name, !selected.get(name));

      setSelected(newSelected);
    },
    [selected],
  );

  useEffect(() => {
    fetch('https://swapi.co/api/planets')
      .then(data => {
        return data.json();
      })
      .then(dataPlanets => {
        setPlanets(dataPlanets.results);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={planets}
        renderItem={({item}) => (
          <Item
            id={item.name}
            title={item.name}
            selected={!!selected.get(item.name)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.name}
        extraData={selected}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
