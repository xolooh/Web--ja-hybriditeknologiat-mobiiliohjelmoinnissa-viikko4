import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTasks = [...tasks, { id: Date.now().toString(), text: newTask, done: false }];
    setTasks(newTasks);
    setNewTask('');
    saveTasks(newTasks);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        value={newTask}
        placeholder="Enter task"
        onChangeText={setNewTask}
      />
      <Button title="Save" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={() => toggleTaskStatus(item.id)} />
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
