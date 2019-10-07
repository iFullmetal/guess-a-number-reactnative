import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
//экспо предоставляет кучу дефолтных сетов иконок на все случаи жизни
import { AntDesign } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import CardLook from '../components/CardLook';
import DefaultStyles from '../constans/default-styles';
import MainButton from '../components/MainButton';
import { ScreenOrientation } from 'expo';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    list: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center',
    }
});

const renderListItem = (length, itemData) => (
    <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>
            #{length - itemData.index}
        </Text>
        <Text style={DefaultStyles.bodyText}>
            {itemData.item}
        </Text>
    </View>
);

export default GameScreen = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const left = useRef(1); //useRef - как стейт, но можно менять без функции и все будет ок и комопненты не ререндерятся при их изменнении
    const right = useRef(99);
    const [guesses, setGuesses] = useState([(((right.current + left.current) / 2) ^ 0).toString()]);
    const [midd, setMidd] = useState(((right.current + left.current) / 2) ^ 0);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);


    useEffect(()=>{
        const updateLayout = ()=>{
            setDeviceHeight(Dimensions.get('window').height);
            setDeviceWidth(Dimensions.get('window').width);
        }
        
        Dimensions.addEventListener('change', updateLayout);

        return ()=>{
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if (midd === props.userChoise) {
            props.onGameOver(guesses.length);
        }
    }, [midd, props.userChoise, props.onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && midd < props.userChoise) || (direction === 'higher' && midd > props.userChoise)) {
            Alert.alert('Hey!', 'Don\'t lie!', [{ text: 'Sorry, my master!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            right.current = midd - 1;
        }
        else {
            left.current = midd + 1;
        }
        // if(left.current > right.current){
        //     //Alert.alert('Guessed', `Your number is ${midd}`);
        //     props.onGameOver(rounds+1);
        //     return;
        // }xxzzz
        let newMidd = ((left.current + right.current) / 2) ^ 0;
        setGuesses(current => [newMidd.toString(), ...current])
        setMidd(newMidd);

    }

    if (deviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent'ts Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <AntDesign name="leftcircleo" size={32} color="white" />
                    </MainButton>
                    <NumberContainer>{midd}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <AntDesign name="rightcircleo" size={32} color="white" />
                    </MainButton>
                </View>
                {/* на scrollview не все стили работают ок, поэтому нужно врапнуть его в обычный view */}
                <View style={styles.list}>
                    {/* <ScrollView>
                        {guesses.map((guess, index) => renderListItem(guess, guesses.length - index))}
                    </ScrollView> */}
                    <FlatList keyExtractor={item => item} data={guesses} renderItem={renderListItem.bind(this, guesses.length)} />
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent'ts Guess</Text>
                <NumberContainer>{midd}</NumberContainer>
                <CardLook style={styles.buttonContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <AntDesign name="leftcircleo" size={32} color="white" />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <AntDesign name="rightcircleo" size={32} color="white" />
                    </MainButton>
                </CardLook>
                {/* на scrollview не все стили работают ок, поэтому нужно врапнуть его в обычный view */}
                <View style={styles.list}>
                    {/* <ScrollView>
                        {guesses.map((guess, index) => renderListItem(guess, guesses.length - index))}
                    </ScrollView> */}
                    <FlatList keyExtractor={item => item} data={guesses} renderItem={renderListItem.bind(this, guesses.length)} />
                </View>
            </View>
        );
    }


};