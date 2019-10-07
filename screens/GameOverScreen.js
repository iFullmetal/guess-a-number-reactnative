import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';

//SafeAreaView - для избежания перекрывания контента бровями смартфона

//две альтернативы для дефолтных стилей
import BodyText from '../components/BodyText';  //1)  - сделать компонент, с нужными стилями
import DefaultStyles from '../constans/default-styles'; //2) сделать глобальные стили и применять их там, где нужно
import Colors from '../constans/colors';
import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.4,
        marginVertical: Dimensions.get('window').height / 30,
        //все части чаилдов, что вылазят за контейнер будут спрятаны
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60,
        padding: 15,
        alignItems: 'center',
    },
    button: {
        marginVertical: 20
    }
});

export default GameOverScreen = props => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={DefaultStyles.title}>The Game is Over!</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/success.png')} style={styles.image} fadeDuration={50} />
                        {/* <Image source={{uri: 'http://www.cs.cmu.edu/~ref/pgss/lecture/7/sier.gif'}} style={styles.image} fadeDuration={50}/> */}
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
                        <MainButton style={styles.button} onPress={props.onRestart}>
                            <Text>NEW GAME</Text>
                        </MainButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};