import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    productName: { fontSize: 20, fontWeight: 'bold'},
    buyButton: { borderRadius: 4, padding: 5, backgroundColor: 'rgb(200,200,200)', alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row'},
    buyButtonWrapper: {marginRight: 0, marginTop: 10},
    imageContainer: { paddingHorizontal: 5, marginTop: 10, width: 120},
    priceContainer: {position: 'absolute',right: 0, },
    price: {color: 'rgb(90,90,90)', textAlign: 'left', },
    shippingPrice: {color: 'green', width: '100%', textAlign: 'right', marginRight: 0, width: '100%'},
    titleContainer: { marginLeft: 0, justifyContent: 'center', margin: 15},
    image: {height: 120, borderRadius: 10, width: '100%',},
    productDesc: { textAlign: 'left', marginLeft: 0},
    loadingWrapper: { justifyContent: 'center', alignItems: 'center'},
    addToCartText: { color: 'black' },
    productDetailsView: { flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'space-between' }
});