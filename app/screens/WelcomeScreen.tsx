import { StyleSheet, View, Image, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppText from '../components/AppText'
import Colors from '../utils/colors'
import { WelcomeScreenProps } from '../utils/types'
import CustomScrollView from '../components/AppScrollView'
import AppButton from '../components/AppButton'
import { horizontalScale, verticalScale } from '../utils/metric'

const { height } = Dimensions.get('window');

const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation: { navigate } }) => {

    const homeImage = require("@/assets/images/welcome.png")

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomScrollView>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={homeImage}
                        style={styles.pictureFrame}
                        resizeMode='contain'
                    />

                    <AppText
                        fontWeight='SemiBold'
                        style={styles.headerText}>
                        Task management & To-Do List
                    </AppText>

                    <AppText style={styles.subText}>
                        This productive tool is designed to help
                        you better manage your task
                        project-wise conveniently!
                    </AppText>

                    <View style={{ flexDirection: "row", marginBottom: verticalScale(20) }}>
                        <AppButton
                            onPress={() => navigate('Login')}
                            buttonText="Let's start"
                            shadow={14}
                            showNext={true}
                        />
                    </View>
                </View>
            </CustomScrollView>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    pictureFrame: {
        height: height / 2,
        marginTop: verticalScale(60),
    },

    headerText: {
        color: Colors.textColor1,
        fontSize: 28,
        textAlign: "center",
        marginTop: verticalScale(45),
        paddingHorizontal: '8%',
    },

    subText: {
        textAlign: "center",
        fontSize: 15.5,
        color: Colors.hintTextColor,
        paddingHorizontal: horizontalScale(10),
        marginTop: verticalScale(36),
        marginBottom: verticalScale(10),
    },
})