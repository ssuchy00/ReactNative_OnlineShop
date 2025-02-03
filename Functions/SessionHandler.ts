import AsyncStorage from '@react-native-async-storage/async-storage';

export const SessionHandler = {
    
    storeData: async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch(error) {
            //console.log("ERROR STORING SESSION: ", error);
        }
    },

    getData: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch(error) {
            console.error('Error retrieving session data: ', error);
            return null;
        }   
    },

    deleteData: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            //console.log('Session data removed successfully');
        } catch (error) {
            console.error('Error removing session data: ', error);
        }
    }
}