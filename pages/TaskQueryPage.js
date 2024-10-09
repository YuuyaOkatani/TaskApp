
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

export const TaskQueryPage = () => {
    return (
        <Animated.View style={[{ flex: flex2 }]}>


            <FlatList
                style={{ flex: flex5 }}
                data={List.tasks || completedTask}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                renderItem={({ item }) => (

                    <View style={[styles.item]}  >

                        {
                            List.tasks && <Checkbox onChange={() => moveTask(item)} />
                        }

                        <TouchableOpacity onPress={() => pullTask(item, List)} style={{ flex: 1, margin: 25 }} onLongPress={() => setDeleteButton(!deleteButton)} >
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                        {

                            deleteButton &&

                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item)}>
                                <RemoveCircleIcon style={{ color: 'red' }} />
                            </TouchableOpacity>

                        }



                    </View>
                )}>

            </FlatList>
        </Animated.View>
    )
}