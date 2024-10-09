import React, { useState } from 'react'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { TouchableOpacity, StyleSheet, ScrollView, TextInput, Text } from 'react-native'
import { withTiming } from 'react-native-reanimated';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export const AddTaskPage = () => {
  const [expanded, setExpanded] = useState(true);
  const [deleteButton, setDeleteButton] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [List, setList] = useState([]);
  const [task, setTask] = useState({})

  const flex3 = useSharedValue(0)
  const height = useSharedValue(0)
  const marginLeft = useSharedValue('100%')
  

  function expandScreen() {

    setExpanded(!expanded)
    setDeleteButton(false)
    console.log("expanded: ", expanded);

    console.log("switch");


    if (expanded) {


      flex3.value = withTiming(1);

      marginLeft.value = withTiming('0%')

      console.log("switch 1");






    }
    else {


      flex3.value = withTiming(0);


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


  return (
    <Animated.View

      style={[{ flex: flex3, marginTop: 10, flexDirection: 'row-reverse', backgroundColor: 'lightgreen', marginBottom: 50, borderRadius: 10, marginLeft }]}>

      <TouchableOpacity style={[styles.addButton]} onPress={expandScreen}  >
        {

          expanded ? <AddIcon /> : <CloseIcon />

        }
      </TouchableOpacity>

      <ScrollView scrollEnabled={false}>

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
            <ScrollView scrollEnabled={false}>
              <Text style={{ fontSize: 15, fontWeight: 600, color: 'white', }}>
                Nenhum nome da tarefa foi adicionado...
              </Text>
            </ScrollView>
          </Animated.View>

        </Animated.View>
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