import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";
import {styles} from './style';

export const ShoppingCartIcon = (props) => {
    const navigation = useNavigation();

    const navigateToCart = () => {
        if( !props.noCart && props.badge > 0 ) {
            navigation.navigate('BasketScreen');
        }
    }
    return (
        <TouchableOpacity disabled={!props.noCart && props.badge === 0} onPress={navigateToCart} style={styles.container}>
            <View style={styles.badgeWrapper}>
                <Text style={styles.badge}>{props.badge}</Text>
            </View>
            <Icon name="shoppingcart" color="black" size={24} style={styles.icon} />
        </TouchableOpacity>
    )
}