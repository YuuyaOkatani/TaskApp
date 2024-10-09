
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "react-progressbar-fancy";
import { db } from "../api/firebase-config";
import { getDocs, collection, addDoc, serverTimestamp, Timestamp, updateDoc, getDoc, doc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import Animated, { useSharedValue, withTiming, Easing, ReduceMotion } from "react-native-reanimated";
import { Checkbox, ListItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Functions } from '../components/functions.js';
import { AddTaskPage } from "./AddTaskPage.js";
import { ListQueryPage } from "./ListQueryPage.js";
import { Scrollbars} from "react-custom-scrollbars";


export default function HomeScreen({ navigation }) {



    const [data, setData] = useState([])
    const [ListData, setListData] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const [deleteButton, setDeleteButton] = useState(false);

    const [taskButton, setTaskButton] = useState(true);

    const [expanded, setExpanded] = useState(true);

    const [List, setList] = useState([]);
    const [taskName, setTaskName] = useState('');

    const [description, setDescription] = useState('');

    // const [collectionName, setCollectionName] = useState('Tasks'); 
    const [task, setTask] = useState({})
    const [completedTask, setCompletedTask] = useState({});

    const TaskCollectionRef = collection(db, "Tasks")
    const ListCollectionRef = collection(db, "Lists")
    const CompletedTaskCollection = collection(db, "Completed")

    const TasksQuery = async () => {
        // setCollectionName("Tasks")
        try {

            const querySnapshot = await getDocs(TaskCollectionRef)
            const completedTasksQuerySnapshot = await getDocs(CompletedTaskCollection)
            const userData = [];
            const completedTasksData = [];

            querySnapshot.forEach((doc) => {
                userData.push({ ...doc.data(), id: doc.id })

            });
            completedTasksQuerySnapshot.forEach((doc) => {
                completedTasksData.push({ ...doc.data(), id: doc.id })
            });

            setData(userData);


            setCompletedTask(completedTasksData)




        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);


        }
    }


    const ListQuery = async () => {
        try {
            const querySnapshot = await getDocs(ListCollectionRef)
            const ListDataQuery = [];
            querySnapshot.forEach((doc) => {
                ListDataQuery.push({ ...doc.data(), id: doc.id })
            });


            setListData(ListDataQuery);
        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);

        }
    }


    useEffect(() => {
        TasksQuery();
        ListQuery();
    }, [])


    const flex = useSharedValue(0.05)
    const flex1 = useSharedValue(0.05)
    const flex2 = useSharedValue(1)
    const flex3 = useSharedValue(0)
    const flex4 = useSharedValue(0.2)
    const flex5 = useSharedValue(1)
    const flex6 = useSharedValue(0)
    const height = useSharedValue(0)
    const height1 = useSharedValue(50)

    const marginLeft = useSharedValue('100%')


    function pullContent() {
        // flex1.value = 0.05
        // flex2.value = 0.05
        setDeleteButton(false)

        setTaskButton(!taskButton)


        if (!isOpen) {
            setIsOpen(true)
            flex1.value = 0.05


            flex1.value = withTiming(flex1.value + 1, {
                duration: 250,

                reduceMotion: ReduceMotion.System
            })

            flex2.value = withTiming(flex2.value - flex2.value, {
                duration: 250,
                reduceMotion: ReduceMotion.System
            })

        }
        else {
            setIsOpen(false)
            flex1.value = withTiming(flex1.value - 1, {
                duration: 250,
                reduceMotion: ReduceMotion.System
            })

            if (flex2.value < 1) {
                flex2.value = withTiming(flex2.value + 1, {
                    duration: 250,
                    reduceMotion: ReduceMotion.System
                })
            }
        }








    }

    function pullTask(task, data) {

        console.log(task.name);
        console.log(data);

        setTaskButton(!taskButton)
        setDeleteButton(false)




        if (flex1.value > 0) {
            flex1.value = withTiming(0)

            flex.value = withTiming(1)

            flex2.value = withTiming(0)

            flex3.value = withTiming(0)

            flex6.value = withTiming(1)
            setTaskName(task.name)
            setDescription(task.description)
            setTask(task)


        }
        else {
            flex.value = withTiming(0.05)
            flex1.value = withTiming(0.05)
            flex2.value = withTiming(1)
            flex3.value = withTiming(0)
            flex4.value = withTiming(0.2)
            flex5.value = withTiming(1)
            flex6.value = withTiming(0)
            setTaskName('')
            setDescription('')
            setTask({})




        }

        console.log(task);



    }






    function expandScreen() {

        setExpanded(!expanded)
        setDeleteButton(false)
        console.log("expanded: ", expanded);

        console.log("switch");


        if (expanded) {


            flex2.value = withTiming(flex2.value - flex2.value)
            flex3.value = withTiming(1);
            flex4.value = withTiming(1);
            marginLeft.value = withTiming('0%')

            console.log("switch 1");






        }
        else {

            flex2.value = withTiming(flex2.value + 1)
            flex3.value = withTiming(0);
            flex4.value = withTiming(0.2)
            height1.value = withTiming(50)
            marginLeft.value = withTiming('100%')
            console.log("switch 2");





        }


        console.log("switch 3");


    }


    async function addTaskOnList() {

        if (taskName.trim() != '') {
            try {

                const id = List.id;
                console.log(task);
                console.log(List.name);
                const newDate = new Date()
                console.log(newDate);

                const obj = {
                    id: List.tasks.length + 1,
                    createAt: newDate,
                    name: taskName,
                    description: description,
                    completed: false,
                }



                const documentRef = doc(ListCollectionRef, List.id)
                await updateDoc(documentRef, {
                    tasks: arrayUnion(obj)
                })

                ListQuery()
                TasksQuery()
                const getTasksOfList = await getDoc(documentRef)
                const array = { id, ...getTasksOfList.data() }

                setList(array)






            } catch (error) {
                console.log("Erro ao adicionar tarefa: ", error);


            }
        }
        else {
            height.value = withTiming(50)
            setTimeout(() => {
                height.value = withTiming(0)

            }, 3000)
        }
    }

    async function updateTask() {
        console.log(task);

        const id = List.id;



        try {

            if (List.tasks) {
                const documentRef = doc(ListCollectionRef, List.id);
                List.tasks.forEach(taskRef => {
                    if (taskRef.id === task.id) {
                        console.log(taskRef);
                        updateDoc(documentRef, {
                            tasks: arrayRemove(taskRef)
                        })
                        updateDoc(documentRef, {
                            tasks: arrayUnion({
                                id: taskRef.id,
                                createAt: taskRef.createAt,
                                name: taskName,
                                description: description,
                                completed: taskRef.completed,
                            })
                        });
                    }
                })







                TasksQuery()
                ListQuery()

                const getTasksOfList = await getDoc(documentRef)
                const array = { id, ...getTasksOfList.data() }

                setList(array)


            }
            else {


                const documentRef = doc(CompletedTaskCollection, task.id)
                await updateDoc(documentRef, {
                    name: taskName,
                    description: description
                })
                TasksQuery()
                ListQuery()
            }

            console.log(task.id);









        } catch (error) {
            console.log('Algo deu errado ao atualizar documento: ', error);


        }


    }

    async function moveTask(task) {
        //setCollectionName("Completed")
        console.log("Move task: " + task.name);
        console.log(List.name);
        console.log(List.id);
        console.log(List);

        const id = List.id;
        const ListDocmentRef = doc(ListCollectionRef, List.id)







        try {
            await addDoc(CompletedTaskCollection, {
                createAt: task.createAt,
                name: task.name,
                description: task.description,
                completed: true,
            })

            await updateDoc(ListDocmentRef, {
                tasks: arrayRemove(task)
            })


            TasksQuery()
            ListQuery()
            const getTasksOfList = await getDoc(ListDocmentRef)
            const array = { id, ...getTasksOfList.data() }

            setList(array)
            console.log(array);


        } catch (error) {
            console.log('Algo deu errado ao mover documento: ', error);

        }
    }

    async function deleteTask(task) {
        console.log("Delete task: " + task.name);
        console.log(List.name);
        console.log(List.id);
        console.log(List);

        const id = List.id;
        if (List.tasks) {
            const documentRef = doc(ListCollectionRef, List.id);
            try {
                await updateDoc(documentRef, {
                    tasks: arrayRemove(task)
                })
                const getTasksOfList = await getDoc(documentRef)
                const array = { id, ...getTasksOfList.data() }

                setList(array)
            } catch (error) {
                console.log("Erro ao deletar a tarefa: ", error);


            }
        }
        else {
            const documentRef = doc(CompletedTaskCollection, task.id)
            try {
                await deleteDoc(documentRef, task)
                await TasksQuery()

            } catch (error) {
                console.log("Erro ao deletar a tarefa: ", error);

            }
        }

    }

    async function deleteList(list) {
        const documentRef = doc(ListCollectionRef, list.id)
        try {

            await deleteDoc(documentRef, list)
            if (List.id === list.id) {
                setList({})
            }
            ListQuery()
        } catch (error) {
            console.log("Erro ao deletar a lista: ", error);


        }
    }

    function newList() {
        setDeleteButton(false)
        try {
            addDoc(ListCollectionRef, {
                createAt: serverTimestamp(),
                name: `New List (${ListData.length + 1})`,
                tasks: [],

            })
            ListQuery()
        } catch (error) {

        }


    }

    async function editList(text) {
        try {
            const documentRef = doc(ListCollectionRef, List.id)
            await updateDoc(documentRef, {
                name: text,
            })
            ListQuery()


        } catch (error) {
            console.log("Erro ao editar a lista: ", error);

        }
    }






    return (
        <View style={styles.container}>

            <View style={styles.containerMiddle}>



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
                    <Scrollbars >
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
                    </Scrollbars>
                </Animated.View>


                <Animated.View style={[{ flex: flex2 }]}>


                    <Scrollbars>
                        <FlatList
                            style={{ flex: flex5 }}
                            data={List.tasks || completedTask}
                            keyExtractor={(item) => item.id}
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
                    </Scrollbars>
                </Animated.View>



                {taskButton && List.tasks &&


                    <Animated.View

                        style={[{ flex: flex3, marginTop: 10, flexDirection: 'row-reverse', backgroundColor: 'lightgreen', marginBottom: 50, borderRadius: 10, marginLeft }]}>

                        <TouchableOpacity style={[styles.addButton]} onPress={expandScreen}  >
                            {

                                expanded ? <AddIcon /> : <CloseIcon />

                            }
                        </TouchableOpacity>

                        <Scrollbars >

                            <Animated.View style={{ flex: 1, padding: 10, marginLeft: 50, marginTop: 50 }}>

                                <Text style={{ fontSize: 20, fontWeight: 700 }}>
                                    New task:
                                </Text>

                                <TextInput

                                    style={{ borderRadius: 10, backgroundColor: 'white', height: 25 }}
                                    onChangeText={(text) => (setTaskName(text))}
                                    placeholder="Task name"

                                />

                                <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 10 }}>
                                    Description:
                                </Text>

                                <TextInput

                                    style={{ height: 'auto', borderRadius: 10, backgroundColor: 'white', height: 200 }}
                                    multiline={true}
                                    placeholder="Description"
                                    onChangeText={(text) => (setDescription(text))}

                                >

                                </TextInput>

                                <TouchableOpacity
                                    style={{ backgroundColor: 'green', marginTop: '100%', borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={addTaskOnList}>

                                    <Text style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>
                                        ✔ Add task!
                                    </Text>

                                </TouchableOpacity>
                                <Animated.View
                                    style={{ backgroundColor: 'red', marginTop: 30, borderRadius: 10, height, justifyContent: 'center', alignItems: 'center', }}>
                                    <Scrollbars>
                                        <Text style={{ fontSize: 15, fontWeight: 600, color: 'white', }}>
                                            Nenhum nome da tarefa foi adicionado...
                                        </Text>
                                    </Scrollbars>
                                </Animated.View>

                            </Animated.View>
                        </Scrollbars>
                    </Animated.View>
                }

                <Animated.View style={{ flex: flex6, backgroundColor: '#cbf7ed', borderRadius: 10 }}>
                    {!taskButton &&
                        <Scrollbars  >
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableOpacity onPress={pullTask}>
                                    <CloseIcon style={{ padding: 10 }}></CloseIcon>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={styles.updateText}>
                                    Name:
                                </Text>

                                <TextInput style={styles.updateText} value={taskName} onChangeText={(text) => setTaskName(text)}>

                                </TextInput>



                            </View>
                            <View>

                                <Text style={styles.updateText}>
                                    Description:
                                </Text>

                                <TextInput
                                    multiline={true}
                                    style={[styles.updateText, { height: 300 }]}
                                    value={description}
                                    onChangeText={(text) => setDescription(text)}
                                >

                                </TextInput>

                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', margin: 10 }}>

                                    Status: {task.completed ? 'completed' : 'pendent'}

                                </Text>



                            </View>
                            <View style={{ padding: 50 }}>

                                <TouchableOpacity
                                    style={{ backgroundColor: '#05f77a', marginTop: 50, borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={updateTask}>

                                    <Text style={{ fontSize: 20, fontWeight: 700, color: 'black' }}>
                                        💾 Update task!
                                    </Text>

                                </TouchableOpacity>
                            </View>

                        </Scrollbars>
                    }
                </Animated.View>

            </View>
        </View >
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

