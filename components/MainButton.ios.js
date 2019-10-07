//реакт сам выберет, какой компонент подключать с .ios или с .android

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native'

import Colors from '../constans/colors';

export default MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={{ ...styles.button, ...props.style }}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
    },
    //чтобы перекрывать часть эффекта TouchableNativeFeedback, который идет по квадрату,
    //а моя кнопка скругленная по углам, так что я избавляюсь от лишнего
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    }
})