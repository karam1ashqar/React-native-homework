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
        return (
            <View key={`category-${index}`} style={styles.listItem}>
                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.img}} style={styles.productImage}/>
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}$</Text>
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
                    currentProductsInCart.push(_.get(category, `.products[${productInCart.productId}]`))
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
        props.navigation.navigate('CheckoutComponent', {couponCode: COUPON_CODES[couponCode]})
    }

    const onChangeCouponCodeText = text => setCouponCode(text);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/images/header.jpeg')} style={styles.headerImage} />
                <View style={styles.overlayBlack} />
                <View style={styles.overlayView}>
                    <Text style={styles.titleInOverlay}>Products that were added to cart</Text>
                </View>
            </View>
            <FlatList 
                data={productsInCart}
                style={styles.list}
                renderItem={renderProduct}
                keyExtractor={keyExtractor}
            />
            <View style={styles.textInputContainer}>
                <TextInput value={couponCode} onChangeText={onChangeCouponCodeText} placeholderTextColor="grey" style={styles.input} placeholder="Coupon code" />
                <Button onPress={checkCouponCode} title="Check coupon code" />
            </View>
            <Text style={styles.productDetails}>Total amount: {totalAmount}$</Text>
            <Button onPress={goToCheckout} title="Go to checkout" />
        </View>
    )
}

const mapStateToProps = (state) => ({
    productsCart: state.cart,
    products: state.data,
});

export default connect(mapStateToProps)(BasketScreen);
