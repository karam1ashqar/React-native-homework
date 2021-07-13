import {StyleSheet} from 'react-native';
import {applyShadow} from '../../utils';

export const styles = StyleSheet.create({
    titleInOverlay: {color: 'white', textAlign: 'center', letterSpacing: 1, fontFamily: 'Merienda-Bold'},
    subTitleInOverlay: {color: 'white', width: 200, textAlign: 'center', marginTop: 5, fontSize: 12, color: 'rgb(220,220,220)', fontFamily: 'Merienda'},
    overlayView: { position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'},
    header: { position: 'relative', marginBottom: 15 },
    overlayBlack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.55)'},
    headerImage: { width: '100%', height: 120 },
    container: { backgroundColor: 'white', flex: 1 },
    list: {marginBottom: 50,},
    listItem: { flex: 1, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5, flexDirection: 'row', margin: 5},
    productImage: {height: 75, width: 75, borderRadius: 4},
    productImageWrapper: {  
        ...applyShadow,
        marginLeft: 15,
        width: 75, 
        height: 75,
        borderRadius: 4,
    },
    productDetails: {margin: 10},
    title: { textAlign: 'center', fontFamily: 'Merienda-Bold' },
    price: { textAlign: 'center', fontFamily: 'Merienda', color: 'rgb(90,90,90)' },
    subTitle: { marginTop: 4, color: "#999", fontFamily: 'Merienda-Regular', textAlign: 'justify', fontSize: 11 },
    input: {color: 'black', flex: 1},
    textInputContainer: {flexDirection: 'row', marginBottom: 10, alignItems: 'center'}
});