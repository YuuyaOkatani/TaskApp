import React from 'react'




export const EditTaskPage = () => {
  return (
    <Animated.View style={{ flex: flex6, backgroundColor: '#cbf7ed', borderRadius: 10 }}>
      {!taskButton &&
        <ScrollView scrollEnabled={false} >
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

        </ScrollView>
      }
    </Animated.View>
  )
}
