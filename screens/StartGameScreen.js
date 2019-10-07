import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import CardLook from '../components/CardLook';
import Colors from '../constans/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        //некрасиво на маленьких мобилочках
        // width: 300,
        // //если девайс меньше, чем width, то он не займет, более чем 80% размера экрана девайса
        //maxWidth: '80%',
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    title: {
        marginVertical: 10,
        fontSize: 20
    },
    input: {
        width: '20%',
        textAlign: 'center',
    },
    summartContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonStyle, setButtonStyle] = useState({});

    useEffect(()=>{
        //для пересчета разметки при смене размеров экрана (например, смена ориентации)
        const updateLayout = ()=> {
            buttonStyle = { width:  Dimensions.get('window').width / 4 }
        }
    
        //цепляю ивент, на смену размеров экрана
        Dimensions.addEventListener('change', updateLayout);
        //чтобы не цеплять их 100500 удаляю (да, бредово, но лень думать, как сделать лучше)
        Dimensions.removeEventListener('change', updateLayout);
    });

    const numberInputHandler = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choosedNumber = parseInt(enteredValue)
        if (isNaN(choosedNumber) || choosedNumber <= 0) {
            //типа MessageBox в winforms, но с настройками поведения для кнопок (в 3 аргументе)
            Alert.alert('AHTUNG!', 'Number has to be a number between 1 and 99.', [{ text: 'Yes, sir', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        //т.к. реакт сетнет enteredValue только после следующей итерации отрисовки, значение все еще старое и его можно использовать
        setSelectedNumber(choosedNumber);
        Keyboard.dismiss();//прячу клаву
    };
    //KeyboardAvoidingView - не дает клаве перекрывать мой инпут, когда она появляется
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    {/* для того, чтобы можно было закрыть клаву, нажав просто мимо */}
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        {/* несмотря на то, что это мой компонент, я мог заюзать стили отсюда */}
                        <CardLook style={styles.inputContainer}>{/* в этом вью все лежит по y*/}
                            <BodyText>Select a number</BodyText>
                            {/* инпут для цифр */}
                            <Input style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                                keyboardType="numeric"
                            />
                            {/* а в этом по x */}
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button title="Restet" onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={styles.button}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </CardLook>
                        {confirmed &&
                            <CardLook style={styles.summartContainer}>
                                <BodyText>You selected</BodyText>
                                <NumberContainer>{selectedNumber}</NumberContainer>
                                <MainButton onPress={props.onStartGame.bind(this, selectedNumber)}>
                                    <Text>START GAME!</Text>
                                </MainButton>
                            </CardLook>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};



