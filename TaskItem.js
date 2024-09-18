import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={styles.task}>
        <Text style={[styles.text, task.done && styles.strikeThrough]}>
          {task.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TaskItem;
