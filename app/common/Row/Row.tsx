import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, addOpacity, weight, width } from '@/app/utils';
import { ms } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppText from '../Text/AppText';

interface RowProps {
    selectedDate: Date,
    onDateChange: (event: DateTimePickerEvent, date: Date | undefined) => void
}

const Row: React.FC<RowProps> = ({ selectedDate, onDateChange }) => {

    const [tags, setTags] = useState([
        'Urgent', 'High Priority', 'Medium Priority', 'Low Priority', 'Backlog',
        'In Progress', 'Completed', 'Review', 'Blocked', 'On Hold'
    ]);
    const textCellWidth = ms(70); // Set a fixed width based on the longest text you expect


    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: selectedDate,
            onChange: onDateChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    return (
        <View style={styles.table}>
            {/* Row 1 */}
            <View style={[styles.row, { marginBottom: 10 }]}>
                <AppText style={[styles.textCell, { width: textCellWidth }]}>List</AppText>
                <View style={styles.containerCell}>
                    <AppText style={styles.containerText}>
                        22-03-22
                    </AppText>
                </View>
            </View>

            {/* Row 2 */}
            <View style={[styles.row, { marginBottom: 6 }]}>
                <AppText style={[styles.textCell, { width: textCellWidth }]}>Due Date</AppText>
                <Pressable onPress={showDatepicker}>
                    <View style={styles.containerCell}>
                        <AppText style={styles.containerText}>
                            {selectedDate.toDateString()}
                        </AppText>
                        <Ionicons
                            size={16}
                            name={"chevron-down"}
                            color={Colors.textColor1}
                            style={styles.icon}
                        />
                    </View>
                </Pressable>
            </View>

            {/* Row 3 */}
            <View style={styles.row}>
                <AppText style={[styles.textCell, { width: textCellWidth }]}>Tags</AppText>
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={[styles.containerCell, styles.tagContainer]}>
                            <AppText style={[styles.containerText, styles.tagText]}>
                                {tag}
                            </AppText>
                        </View>
                    ))}
                    <Pressable onPress={() => { /* Add your logic for adding a tag here */ }}>
                        <View style={[styles.containerCell, styles.addTagContainer]}>
                            <Ionicons
                                size={18}
                                name={"add"}
                                color={Colors.textColor1}
                                style={styles.addIcon}
                            />
                            <AppText fontWeight={weight.M} style={[styles.containerText, { fontSize: ms(10) }]}>
                                Add Tag
                            </AppText>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Row;

const styles = StyleSheet.create({
    table: {
        paddingTop: 4,
        paddingHorizontal: 16,
        width: width * 0.91,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    icon: {
        marginLeft: 4,
        marginTop: ms(2.5),
    },
    addIcon: {
        marginLeft: 0,
        marginTop: ms(1),
    },
    textCell: {
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.7),
    },
    containerCell: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.divider,
        borderWidth: StyleSheet.hairlineWidth,
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
    containerText: {
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.7),
    },
    tagContainer: {
        backgroundColor: Colors.blue,
        borderWidth: 0,
        marginRight: 8, // Add some margin between tags
        marginVertical: 4,
    },
    tagText: {
        color: Colors.textColor4,
        fontSize: ms(10),
    },
    addTagContainer: {

        borderWidth: 0,
        backgroundColor: Colors.selectedTile,
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});
