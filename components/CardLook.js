import React from 'react';
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    //card-look.
    inputContainer: {
        padding: 20,
        borderRadius: 10,
        //делаю тень. работает только на яблоос
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        //это аналог для андроида. работает только на нем и делает тоже самое
        elevation: 8,
    },
});

export default CardLook = (props) => {
        //props.children - т.е. получается врапер для всех чилдренов
        //кроме стилей отсюда так же будут использовани стили из пропов, а местные будут перезаписаны
        //т.е. работают кастомные стили
     return (
        <View style={{...styles.inputContainer, ...props.style}}>{props.children}</View>
     );
}