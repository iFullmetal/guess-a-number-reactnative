import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constans/colors';

const Header = (props) => {
    //Platform.select({ios: ..., androind: ...}) - вернет нужный объект в зависимости от платформы
    return (
        <View style={
            {
                ...styles.headerBase,
                ...Platform.select(
                    {
                        ios: styles.headerIOS,
                        android: styles.headerAndroid
                    })
            }
        }>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: undefined
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;