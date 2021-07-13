import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    productName: { fontSize: 20, fontWeight : 'bold'},
    buyButton: { borderRadius: 4, padding: 5, backgroundColor: 'rgb(200,200,200)', alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row'},
    buyButtonWrapper: {marginLeft: 30, marginTop: 10},
    imageContainer: { paddingHorizontal: 30, width: '100%' },
    priceContainer: {position: 'absolute',right: 30, },
    price: {color: 'rgb(90,90,90)', textAlign: 'left', },
    shippingPrice: {color: 'rgb(90,90,90)', textAlign: 'right', marginRight: 30, width: '100%'},
    titleContainer: {width: '100%', alignItems: 'center', justifyContent: 'center', margin: 10},
    image: {height: 200, width: '100%',},
    productDesc: { textAlign: 'left', marginLeft: 30},
    loadingWrapper: { justifyContent: 'center', alignItems: 'center'},
    addToCartText: { color: 'black' },
    productDetailsView: { flex: 1 }
});