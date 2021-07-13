import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux';
import {loadProducts} from '../../redux/actions'
import SpinnerComponent from "../../components/spinner/spinner.component";
import {keyExtractor} from '../../utils';
import {styles} from './style';

const HomeScreen = (props) => {

    const navigateToCategory = (index, name, image) => () => {
        props.navigation.navigate('CategoryScreen', {name, categoryId: index, image});
    }

    const renderCategory = ({item, index}) => {
        return (
            <TouchableOpacity key={`category-${index}`} style={styles.listItem} onPress={navigateToCategory(index, item.name, item.image)}>
                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.image}} style={styles.productImage}/>
                </View>
                <View style={styles.productDetails}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )};

    useEffect(() => {
        props.loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={props.categories}
                style={styles.list}
                renderItem={renderCategory}
                keyExtractor={keyExtractor}
            />
            <SpinnerComponent isLoading={props.isLoading}/>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loadProducts: () => loadProducts(null, dispatch),
});

const mapStateToProps = (state) => ({
    categories: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
