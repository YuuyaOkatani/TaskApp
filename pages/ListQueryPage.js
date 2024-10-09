
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "react-progressbar-fancy";
import { db } from "../api/firebase-config.js";
import { getDocs, collection, addDoc, serverTimestamp, Timestamp, updateDoc, getDoc, doc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import Animated, { useSharedValue, withTiming, Easing, ReduceMotion } from "react-native-reanimated";
import { Checkbox, ListItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Functions } from '../components/functions.js';

export const ListQueryPage = () => {
    const flex1 = useSharedValue(0.05)
    return (
        <Animated.View style={[styles.ListLabel, { flex: flex1 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={pullContent} style={{ flex: 1 }}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 20, margin: 10 }]}>
                        {List.name ? List.name : 'Completed Tasks'}
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }} onPress={newList}>
                    <AddIcon />
                </TouchableOpacity>
            </View>
            <ScrollView scrollEnabled={true}>
                <View>
                    <FlatList
                        style={{ flex: flex5 }}
                        data={ListData}
                        keyExtractor={(item) => item.id}


                        renderItem={({ item }) => (

                            <View style={[styles.item, { padding: 10 }]}  >

                                <TouchableOpacity style={{ flex: 1 }} onPress={() => { setList(item); setDeleteButton(false) }} onLongPress={() => setDeleteButton(!deleteButton)}>
                                    <TextInput value={item.name} style={{ margin: 10 }} onChangeText={(text) => editList(text)}  >

                                    </TextInput>

                                </TouchableOpacity>

                                {

                                    deleteButton &&



                                    <TouchableOpacity style={{}} onPress={() => deleteList(item)}>
                                        <RemoveCircleIcon style={{ color: 'red' }} />

                                    </TouchableOpacity>

                                }



                            </View>
                        )}>

                    </FlatList>
                    <View style={[styles.item, { padding: 10 }]}  >

                        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                            setList(completedTask)
                        }} onLongPress={() => setDeleteButton(!deleteButton)}>
                            <Text style={{ margin: 10 }}>
                                Completed Tasks
                            </Text>

                        </TouchableOpacity>




                    </View>

                </View>
            </ScrollView>
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        padding: 10,
        backgroundColor: '#161925'
    },

    containerTop: {
        borderWidth: 0.5,
        borderColor: 'white',
        flexDirection: 'row',
        padding: 5,
        height: '100px'




    },
    containerTopLevel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 0.5,



    },
    containerTopStats: {
        flex: 2,
        padding: 20,




    },
    containerMiddle: {
        flex: 1,
        padding: 5,



    },
    containerBottom: {

        borderWidth: 0.5,
        borderColor: 'white',
        padding: 5,
        marginTop: 10



    },

    item: {

        // height: 50,
        margin: 6,
        //padding: 10,
        backgroundColor: '#cbf7ed',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'

    },

    ListLabel: {
        backgroundColor: '#406e8e',
        borderRadius: 10,



    },


    text: {
        color: 'white',

    },

    updateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        margin: 10

    },
    button: {
        flex: 1,



    },
    addButton: {

        width: 50,
        height: 50,
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',





    },
    addPage: {

        marginTop: 10,


    },

    deleteCheckBox: {
        flexDirection: 'row',
        alignItems: 'center',

    }

    ,
    deleteButton: {
        borderRadius: 10,
        margin: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'

    }



});