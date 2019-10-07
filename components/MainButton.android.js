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
    //если это андроид, то буду вместо опасити юзать более красивый нативный андроидный эффект
    let CurrentTouchable = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        CurrentTouchable = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <CurrentTouchable activeOpacity={0.8} onPress={props.onPress}>
                <View style={{ ...styles.button, ...props.style }}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </CurrentTouchable>
        </View>
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