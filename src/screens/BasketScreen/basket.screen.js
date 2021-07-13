import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, Image, TextInput, ToastAndroid} from 'react-native'
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {styles} from './style';
import {TOAST_TIME, keyExtractor} from '../../utils';
import {COUPON_CODES} from './basket.config';

const BasketScreen = (props) => {
    const [productsInCart, setProductsInCart] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCouponCode, setAppliedCouponCode] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const renderProduct = ({item, index}) => {
        if( !item ) {
            return null;
        }
        return (
            <View key={`category-${index}`} style={styles.listItem}>
                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.image}} style={styles.productImage}/>
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.name} - {item.price}$</Text>
                </View>
            </View>
        )   
    };

    useEffect(() => {
        getTotalAmount();
        getProductsInCart();
    }, []);

    const getProductsInCart = () => {
        let currentProductsInCart = [];
        _.get(props, 'productsCart', []).forEach(productInCart => {
            _.get(props, 'products', []).forEach(category => {
                if( _.get(category, 'id') === _.get(productInCart, 'categoryId') ) {
                    currentProductsInCart.push(_.get(category, `products[${productInCart.productId}]`))
                }
            })
        })
        setProductsInCart(currentProductsInCart);
    }

    const getTotalAmount = () => {
        let amount = 0;

        _.get(props, 'productsCart', []).forEach(productInCart => {
            _.get(props, 'products', []).forEach(category => {
                if( _.get(category, 'id') === _.get(productInCart, 'categoryId') ) {
                    amount += _.get(category, `products[${productInCart.productId}].price`);
                }
            })
        })
        setTotalAmount(amount);
    }

    const checkCouponCode = () => {
        if( appliedCouponCode ) {
            return;
        }
        const couponCodes = Object.keys(COUPON_CODES);
        if( couponCodes.includes(couponCode) ) {
            setTotalAmount(a => ( a - a * ( COUPON_CODES[couponCode] / 100 )));
            ToastAndroid.show(`Coupon code applied successfully, got ${COUPON_CODES[couponCode]}% off`, TOAST_TIME)
            setAppliedCouponCode(true);
        } else {
            ToastAndroid.show(`Error: Coupon code is invalid`, TOAST_TIME)
        }
    }

    const goToCheckout = () => {
        props.navigation.navigate('CheckoutScreen', {couponCode: COUPON_CODES[couponCode]})
    }

    const onChangeCouponCodeText = text => setCouponCode(text);

    return (
        <View style={styles.container}>
            <FlatList 
                data={productsInCart}
                style={styles.list}
                renderItem={renderProduct}
                keyExtractor={keyExtractor}
            />
            <View style={styles.textInputContainer}>
                <TextInput value={couponCode} onChangeText={onChangeCouponCodeText} placeholderTextColor="grey" style={styles.input} placeholder="Coupon code" />
            </View>
                            <Button onPress={checkCouponCode} title="Apply coupon" />

            <Text style={styles.productDetails}>FINAL PRICE: {totalAmount}$</Text>
            <Button onPress={goToCheckout} title="Checkout" />
        </View>
    )
}

const mapStateToProps = (state) => ({
    productsCart: state.cart,
    products: state.data,
});

export default connect(mapStateToProps)(BasketScreen);
