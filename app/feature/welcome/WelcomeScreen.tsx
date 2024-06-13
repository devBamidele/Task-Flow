import { StyleSheet, View, Image, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppButton, AppScrollView, AppText } from '../../common';
import { Colors, verticalScale, weight } from '../../utils';
import { WelcomeScreenProps } from '../../utils/types';
import { ms, mvs } from 'react-native-size-matters';

const { height } = Dimensions.get('window');

const WelcomeScreen: FC<WelcomeScreenProps> = (props) => {

    const { navigation: { navigate } } = props;

    const homeImage = require("@/assets/images/welcome.png")

    return (
        <SafeAreaView style={styles.mainView} edges={['top', 'left', 'right']}>
            <AppScrollView>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={homeImage}
                        style={styles.pictureFrame}
                        resizeMode='contain'
                    />

                    <AppText
                        fontWeight={weight.Sb}
                        style={styles.headerText}>
                        Task management & To-Do List
                    </AppText>

                    <AppText style={styles.subText}>
                        This productive tool is designed to help
                        you better manage your task
                        project-wise conveniently!
                    </AppText>

                </View>

                <View style={{ flexDirection: "row", }}>
                    <AppButton
                        onPress={() => navigate('Login')}
                        buttonText="Let's start"
                        shadow={8}
                        showNext={true}
                    />
                </View>
            </AppScrollView>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    pictureFrame: {
        height: mvs(height / 2.4),
        marginTop: mvs(60),
    },

    headerText: {
        color: Colors.textColor1,
        fontSize: ms(23),
        textAlign: "center",
        marginTop: mvs(40),
        paddingHorizontal: '8%',
    },

    subText: {
        textAlign: "center",
        fontSize: ms(13),
        color: Colors.hintTextColor,
        paddingHorizontal: ms(15),
        marginTop: mvs(26),
        marginBottom: mvs(10),
    },
})