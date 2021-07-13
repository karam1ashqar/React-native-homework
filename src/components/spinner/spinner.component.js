import React from "react";
import {ActivityIndicator} from 'react-native';
import {COLORS} from "../../utils";
import { styles } from './style';

export default (props) => {

    if( !props.isLoading ) {
        return null;
    }
    return <ActivityIndicator color={COLORS.DARK} style={styles.spinner} />
}
