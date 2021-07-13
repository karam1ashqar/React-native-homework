import {StyleSheet} from 'react-native';
import {applyShadow} from '../../utils';

export const styles = StyleSheet.create({
    titleInOverlay: {color: 'white', textAlign: 'center', letterSpacing: 1, fontFamily: 'ZenLoop-Italic'},
    subTitleInOverlay: {color: 'white', width: 200, textAlign: 'center', marginTop: 5, fontSize: 12, color: 'rgb(220,220,220)', fontFamily: 'ZenLoop-Regular'},
    overlayView: { position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'},
    header: { position: 'relative', marginBottom: 15 },
    overlayBlack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.55)'},
    headerImage: { width: '100%', height: 120 },
    container: { backgroundColor: 'white', flex: 1 },
    list: {marginBottom: 50,},
    searchBar: {backgroundColor: 'white', width: '100%', borderColor: 'gray', borderWidth: 0.5, height: 50},
    listItem: { flex: 1, alignItems: 'center', position: 'relative', margin: 5},
    productImage: {height: 100, width: '100%', borderRadius: 4},
    productImageWrapper: {  
        ...applyShadow,
        width: '100%', 
        height: 100,
        borderRadius: 4,
    },
    productDetails: {margin: 5, },
    name: { textAlign: 'center', fontFamily: 'ZenLoop-Italic' },
    subTitle: { marginTop: 4, color: "#999", fontFamily: 'ZenLoop-Regular-Regular', textAlign: 'justify', fontSize: 11 }
});