import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';

const ThankYouScreen = (props) => {
    const continueShopping = () => {
        props.navigation.navigate('HomeScreen');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.thankYouText}>Thank you for your order</Text>
            <TouchableOpacity style={styles.continueShopping} onPress={continueShopping}>
                <Text style={styles.continueShoppingText}>Continue shopping</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ThankYouScreen;
