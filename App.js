import React, {useState} from 'react';
import {StyleSheet, View, FlatList,} from 'react-native';
import { Text, Input, Button, CheckBox} from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState ([
    {key: '1', description: 'Clean bedroom', completed: true},
    {key: '2', description: 'Make appointments', completed: true},
    {key: '3', description: 'Finish homework', completed: false},
  ]);

  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    
    const newTask = {
      key: Date.now().toString(),
      description: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (key) => {
    const updatedTasks = tasks.map(task =>
      task.key === key
      ? {...task, completed: !task.completed}
      : task
    );
    
    setTasks(updatedTasks);
  };

  const deleteTask = (key) => {
    const updatedTasks = tasks.filter(task => task.key !== key);
    setTasks(updatedTasks);
  };

  const renderItem = ({item}) => (
    <View style={styles.taskRow}>  
      <CheckBox
      checked={item.completed}
      onPress={() => toggleTask(item.key)}
      containerStyle={styles.checkbox}
      title= ""
    />

    <Text 
      onPress={() => toggleTask(item.key)}
      style={item.completed ? styles.completed : styles.text}>
      {item.description}
    </Text>

      <Button
      title="Delete"
      size="sm"
      type="outline"
      buttonStyle={{borderColor: '#7b3fe4'}}
      titleStyle={{color: '#7b3fe4'}}
      onPress={() => deleteTask(item.key)}
      />
      </View>
    );

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Checked: Todo List</Text>
      
      <View style={styles.inputContainer}>
        <Input
        placeholder="Enter a task"
        value={input}
        onChangeText={setInput}
        inputStyle={{outlineStyle: 'none'}}
        />
        <Button 
        title="Add" 
        onPress={addTask}
        buttonStyle={{backgroundColor: '#480daf'}}
        />
      </View>

      <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f0ff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3f009e',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  completed: {
    fontSize: 16,
    flex: 1,
    color: '#999',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff8cc',
    padding: 10,
    borderRadius: 10,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 10,
    borderWidth: 0,
    backgroundColor: 'transparent',
  }
});