import React, {useEffect, useState} from 'react';
import {ScrollView, Text, Image, View, TouchableOpacity, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';
import SpinnerComponent from "../../components/spinner/spinner.component";
import * as _ from 'lodash';
import {ShoppingCartIcon} from '../../components/shopping-cart/shopping-cart.component';
import {TOAST_TIME, LOADING_TIME} from '../../utils';
import {styles} from './style';

const ProductComponent = (props) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const product = _.get(props, 'route.params.product', {});
        props.navigation.setOptions({title: product.title});
        setTimeout(() => {
            setProduct(product);
        }, LOADING_TIME);
    }, []);

    const addProductToCart = () => {
        props.addToCart(product.id, _.get(props, 'route.params.categoryId'));
        ToastAndroid.show('Product was added to cart successfully', TOAST_TIME);
    }

    useEffect(() => {
        if( !_.isEmpty(product) ) {
            setLoading(false);
        }
    }, [product])

    return (
        <ScrollView contentContainerStyle={styles.productDetailsView}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode={'cover'}/>
            </View>
            <View>
            <View style={{flexDirection: 'row',  marginBottom: 10, justifyContent: 'space-between'}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.productName}>{_.upperCase(_.get(product, 'name'))}</Text>
                </View>
                {!_.isEmpty(product) && (
                    <View style={styles.buyButtonWrapper}>
                        <TouchableOpacity onPress={addProductToCart} style={styles.buyButton}>
                            <Text style={styles.addToCartText}>Add to cart</Text>
                            <ShoppingCartIcon noCart />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {!_.isEmpty(product) && (
                <>
                    <Text style={styles.productDesc}>
                        <Text style={styles.shippingPrice}>PRICE: ${product.price}</Text>
                    </Text>
                    <Text style={[styles.shippingPrice, styles.productDesc]}>SHIP: ${product.price * 0.15}</Text>
                    <Text style={[styles.shippingPrice, styles.productDesc]}>TOTAL: ${product.price + product.price * 0.15}</Text>
                </>
                
            )}
            </View>
            <View style={styles.loadingWrapper}>
                <SpinnerComponent isLoading={loading}/>
            </View>
        </ScrollView>
    );
}


const mapDispatchToProps = (dispatch) => ({
    addToCart: (productId, categoryId) => addToCart(productId, categoryId, dispatch)
});

const mapStateToProps = (state) => ({
    product: state.data,
    productInCart: state.cart
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
