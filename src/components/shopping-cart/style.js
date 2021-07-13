import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    icon: {
        marginRight:1
    },
    badgeWrapper: {
        position: 'absolute', 
        top: -22,  
        right: 0, 
        width: 70, 
        height: 70, 
        alignItems: "center",
        justifyContent: "center", 
        zIndex: 1950 
    },
    badge: {
        fontSize: 18, 
        fontFamily: "ZenLoop-Regular-Regular"
    },
    container: { 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})