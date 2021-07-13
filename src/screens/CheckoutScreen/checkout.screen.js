import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Button, TextInput} from 'react-native'
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {styles} from './style';

const CheckoutScreen = (props) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        address: '',
        cardHolder: '',
        id: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });
    
    const getTotalAmount = () => {
        let amount = 0;
        _.get(props, 'productsCart', []).forEach((productInCart) => {
            _.get(props, 'products', []).forEach((category) => {
                if( _.get(category, 'id') == _.get(productInCart, 'categoryId') ) {
                    amount += _.get(category, `products[${productInCart.productId}].price`);
                }
            })
        })
        const couponCode = _.get(props, 'route.params.couponCode');
        if( couponCode ) {
            amount = amount - (amount * couponCode / 100);
        } 
        setTotalAmount(amount);
    }

    useEffect(() => {
        getTotalAmount();
    }, []);

    const checkDetailsValidation = () => {
        let missingDetail = '';
        let invalidDetail = '';
        let missingIndex = 0;
        let invalidIndex = 0;
        Object.keys(details).forEach((key) => {
            const value = details[key]
            if( !value ) {
                missingDetail += `${missingIndex !== 0 ? ', ': ''}${key}`;
                missingIndex++;
            } else {
                switch(key) {
                    case 'phoneNumber': {
                        if( value.length !== 10 ) {
                            invalidDetail += `${missingIndex !== 0 ? ', ': ''}${key}`;
                            invalidIndex++;
                        }
                        break;
                    }
                    case 'id': {
                        if( value.length !== 9 ) {
                            invalidDetail += `${invalidIndex !== 0 ? ', ': ''}${key}`;
                            invalidIndex++;
                        }
                        break;
                    }
                    case 'cvv': {
                        if( value.length !== 3 && value.length !== 4 ) {
                            invalidDetail += `${invalidIndex !== 0 ? ', ': ''}${key}`;
                            invalidIndex++;
                        }
                        break;
                    }
                }
            }
        })
        if( missingDetail ) {
            alert(`Missing ${missingDetail}`)
            return false;
        }
        if( invalidDetail ) {
            alert(`Invalid ${invalidDetail}`)
            return false;
        }
        return true;
    }

    const onChangeText = (type) => (text) => {
        setDetails(currentDetails => ({
            ...currentDetails,
            [type]: text
        }))
    }

    const onPurchase = () => {
        if( checkDetailsValidation() ) {
            props.navigation.navigate('ThankYouScreen');
        }
    }

    const renderInput = (type, index) => {

        return (
            <View style={styles.inputWrapper} key={`type-${type}-${index}`}>
                <Text style={styles.text}>{type}* :</Text>
                <TextInput placeholderTextColor="grey" style={styles.textInput} onChangeText={onChangeText(type)} value={details[type]} placeholder={type} />
            </View>
        )
    }

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                {!!totalAmount && <Text>Total amount: {totalAmount}$</Text>}
                {Object.keys(details).map((key, index) => (
                    renderInput(key, index)
                ))}
                <Button style={styles.buyButton} onPress={onPurchase} title="Purchase" />
            </ScrollView>
        </View>

    )
}

const mapStateToProps = (state) => ({
    productsCart: state.cart,
    products: state.data,
});

export default connect(mapStateToProps)(CheckoutScreen);
