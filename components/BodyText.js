import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans'
    }
});

export default BodyText = props => <Text style={{...styles.body, ...props.style}}>{props.children}</Text>