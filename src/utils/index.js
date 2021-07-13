import { Platform } from 'react-native';

export const COLORS = {
    LIGHT: '#ffffff',
    DARK: '#24292e'
};

export const applyShadow = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,    
        backgroundColor: 'white',
    },
    android: {
        elevation: 4
    }
});

export const LOADING_TIME = 2000;
export const TOAST_TIME = 2000;
export const keyExtractor = (item, index) => index;