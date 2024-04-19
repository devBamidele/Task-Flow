import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomScrollView from '@/app/components/AppScrollView'
import AppText from '@/app/components/AppText'
import Colors from '@/app/utils/colors'


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.mainView}>
        <CustomScrollView>
            <View style={[styles.mainView, { paddingHorizontal: 10 }]} >

                <AppText style={{fontSize : 30, color: Colors.textColor1}}>
                    Welcome Dele !
                </AppText>

            </View>
        </CustomScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
})