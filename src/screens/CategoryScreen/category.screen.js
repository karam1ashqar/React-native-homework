import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux';
import SpinnerComponent from "../../components/spinner/spinner.component";
import * as _ from 'lodash';
import {keyExtractor} from '../../utils';
import {styles} from './style';

const CategoryScreen = (props) => {
    const categoryId = _.get(props, 'route.params.categoryId');

    const navigateToProduct = (product) => () => {
        props.navigation.navigate('ProductScreen', {product, categoryId});
    }

    const renderCategory = ({item, index}) => {
        return (
            <TouchableOpacity key={`category-${index}`}
                style={styles.listItem}
                onPress={navigateToProduct({...item, desc: _.get(props, `products[${categoryId}].subTitle`)})}>

                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.image}} style={styles.productImage}/>
                </View>

                <View style={styles.productDetails}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}$</Text>
                </View>
            </TouchableOpacity>
        )};

    useEffect(() => {
        props.navigation.setOptions({
            title: _.get(props, 'route.params.name')
        })
    }, []);

    return (
        <View style={styles.container}>
            <FlatList 
                data={_.get(props, `products[${categoryId}].products`)}
                style={styles.list}
                contentContainerStyle={{flex: 1, flexDirection: 'column'}}
                renderItem={renderCategory}
                numColumns={3}
                keyExtractor={keyExtractor}
            />
            <SpinnerComponent isLoading={props.isLoading}/>
        </View>
    )
}

const mapStateToProps = (state) => ({
    products: state.data,
});

export default connect(mapStateToProps)(CategoryScreen);
