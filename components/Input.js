import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input = props => (
    //спредю пропсы, т.к. там настройки текст инпута
    //стили с этого файла + стили, которые прислали через пропс
    <TextInput {...props} style={{...styles.input, ...props.style}}/>
)