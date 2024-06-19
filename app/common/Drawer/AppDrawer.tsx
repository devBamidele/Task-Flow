import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import AppText from '../Text/AppText';
import { Colors, Tile, weight } from '@/app/utils';
import { useAppDispatch } from '@/app/hooks';
import { loggedOut } from '@/app/redux/auth/slice';
import { clearUserData } from '@/app/redux/user/slice';
import MenuListTile from '../Tile/MenuListTile';
import AppButton from '../Button/AppButton';
import MenuTaskTile from '../Tile/MenuTaskTile';
import { ScaledSheet, ms, mvs, s, vs } from 'react-native-size-matters';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import DrawerTextInput from '../TextInput/DrawerTextInput';


const AppDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const dispatch = useAppDispatch();

    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedTile, setSelectedTile] = useState<string | null>(null);
    const [newList, setNewList] = useState("");


    const getTilesFromBackend = async () => {
        // Replace this with your actual backend call
        return [
            { title: 'Personal', count: 3, color: 'tomato' },
            { title: 'Work', count: 6, color: 'plum' },
            { title: 'List 1', count: 1, color: 'yellow' },
        ];
    };

    useEffect(() => {
        // Fetch data from the backend
        // Replace the following with your actual data fetching logic
        const fetchData = async () => {
            const data = await getTilesFromBackend();
            setTiles(data);
        };

        fetchData();
    }, []);


    const logout = async () => {
        try {
            dispatch(loggedOut());
            dispatch(clearUserData());

            await GoogleSignin.signOut();
        } catch (error) {
            console.log('Google Sign-Out Error: ', error);
        }
    };

    const confirmLogout = () =>
        Alert.alert('Confirm Logout', 'Are you sure you want to logout', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: logout },
        ]);

    const handleTilePress = (title: string) => {
        setSelectedTile(title);
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

                            {tiles.map((tile) => (
                                <MenuListTile
                                    key={tile.title}
                                    title={tile.title}
                                    count={tile.count}
                                    color={tile.color}
                                    isSelected={selectedTile === tile.title}
                                    onPress={() => handleTilePress(tile.title)}
                                />
                            ))}

                            <View>
                                <DrawerTextInput
                                    iconName='add'
                                    placeholder="Add New List"
                                    text={newList}
                                    setText={setNewList}
                                />
                            </View>

                            <View style={[styles.seperator, {
                                marginBottom: mvs(7),
                                marginTop: vs(4),
                            }]} />

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
