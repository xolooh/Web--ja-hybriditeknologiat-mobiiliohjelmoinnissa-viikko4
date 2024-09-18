import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTasksFromStorage = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveTasksToStorage = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error(e);
  }
};