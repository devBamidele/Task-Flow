import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import AppText from '../Text/AppText';
import { Colors, weight } from '@/app/utils';
import { useAppDispatch } from '@/app/hooks';
import { loggedOut } from '@/app/redux/auth/slice';
import { clearUserData } from '@/app/redux/user/slice';
import MenuListTile from '../Tile/MenuListTile';
import AppButton from '../Button/AppButton';
import MenuTaskTile from '../Tile/MenuTaskTile';
import { ScaledSheet, ms, mvs, s, vs } from 'react-native-size-matters';
import AppTextInput from '../TextInput/AppTextInput';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { clearTasks } from '@/app/redux/tasks';

const AppDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const dispatch = useAppDispatch();

    const [selectedTile, setSelectedTile] = useState<string | null>(null);

    const [color, setColor] = useState<number>(1)
    const [listName, setListName] = useState<string>('');

    const logout = async () => handleGoogleLogout();

    const confirmLogout = () =>
        Alert.alert('Confirm Logout', 'Are you sure you want to logout', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: logout },
        ]);

    const handleTilePress = (title: string) => {
        setSelectedTile(title);
    }

    async function handleGoogleLogout() {
        try {
            dispatch(loggedOut());
            dispatch(clearUserData());
            dispatch(clearTasks());

            await GoogleSignin.signOut();
        } catch (error) {
            console.log('Google Sign-Out Error: ', error);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.menu}>
                    <AppText fontWeight={weight.M} style={styles.menuTitle}>
                        Menu
                    </AppText>

                    <View style={styles.menuSection}>
                        <AppText fontWeight={weight.M} style={styles.sectionTitle}>
                            TASKS
                        </AppText>
                        <View style={styles.subMenuSection}>
                            <MenuTaskTile title='Today' icon='list-outline' />
                            <MenuTaskTile title='Completed' icon='checkmark-done-outline' />
                            <MenuTaskTile title='Calender' icon='calendar-outline' />
                            <MenuTaskTile title='Sticky Wall' icon='document-text-outline' />
                        </View>

                        <View style={styles.seperator} />

                        <AppText fontWeight={weight.M} style={styles.sectionTitle}>
                            LISTS
                        </AppText>

                        <View style={styles.subMenuSection}>
                            <MenuListTile
                                title={'Personal'}
                                count={3}
                                color='tomato'
                                isSelected={selectedTile === 'Personal'}
                                onPress={handleTilePress}
                            />
                            <MenuListTile
                                title={'Work'}
                                count={6}
                                color='plum'
                                isSelected={selectedTile === 'Work'}
                                onPress={handleTilePress}
                            />
                            <MenuListTile
                                title={'List 1'}
                                count={1}
                                color='yellow'
                                isSelected={selectedTile === 'List 1'}
                                onPress={handleTilePress}
                            />

                            <View style={{ marginLeft: ms(1) }}>
                                <MenuTaskTile title='Add New List' icon='add' />
                            </View>

                            <View style={styles.listContainer}>

                                <AppTextInput
                                    placeholder="List Name"
                                    placeholderTextColor={Colors.textColor3}
                                    text={listName}
                                    keyboardType="email-address"
                                    setText={setListName}
                                    returnKeyType='go'
                                    isList={true}
                                    textPadding={ms(1)}
                                    squareColor={tiles[color - 1].color}
                                />

                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.scrollView}
                                >
                                    {tiles.map(
                                        tile => (
                                            <TouchableOpacity
                                                key={tile.id}
                                                onPress={() => setColor(tile.id)}
                                                activeOpacity={0.7}
                                            >
                                                <View
                                                    style={[
                                                        styles.squareSelector,
                                                        tile.id === color && { borderColor: Colors.divider }]} >
                                                    <View style={[styles.square, { backgroundColor: tile.color }]} />
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                </ScrollView>

                            </View>

                            <View style={styles.seperator} />

                            <View style={styles.subMenuSection}>
                                <MenuTaskTile title='Settings' icon="options-outline" />
                            </View>
                        </View>

                    </View>
                </View>
            </DrawerContentScrollView>

            <View>
                <AppButton
                    onPress={confirmLogout}
                    buttonText="Sign out"
                    isLoading={false}
                    marginTop={10}
                    paddingHorizontal={ms(8)}
                    paddingBottom={ms(8)}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const tiles = [
    { id: 1, color: '#FF6B6B' },
    { id: 2, color: '#DA77F2' },
    { id: 3, color: '#F4F4F4' },
    { id: 4, color: '#5C7CFA' },
    { id: 5, color: '#66D9E8' },
    { id: 6, color: '#8CE99A' },
    { id: 7, color: '#FFD43B' },
    { id: 8, color: '#FF922B' },
];

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexDirection: 'row',
        marginTop: mvs(12),
        marginBottom: mvs(4),
        marginLeft: ms(6),
    },

    listContainer: {
        borderColor: Colors.divider,
        borderWidth: StyleSheet.hairlineWidth,
        padding: ms(8),
        borderRadius: 8,
        marginRight: ms(7),
        marginBottom: 4,
        marginTop: 2,
    },
    menu: {
        paddingHorizontal: ms(6),
        paddingTop: mvs(3),
    },
    menuTitle: {
        fontSize: ms(23),
        paddingBottom: mvs(10),
        color: Colors.textColor4,
    },
    menuSection: {
        marginLeft: s(4),
    },
    subMenuSection: {
        marginLeft: s(4),
        marginTop: s(4),
        gap: s(2),
    },
    sectionTitle: {
        fontSize: ms(12.5),
        color: Colors.textColor4,
    },
    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.divider,
        marginHorizontal: ms(2),
        marginBottom: mvs(10),
        marginTop: vs(6),
    },
    square: {
        width: ms(14),
        height: ms(14),
        borderRadius: 4,

    },
    squareSelector: {
        borderColor: 'transparent',
        borderWidth: StyleSheet.hairlineWidth,
        padding: ms(6),
        borderRadius: 4,
        marginRight: ms(2),
    },

});

export default AppDrawer;
