import * as React from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const SPACING = 24;
const FONT_SIZE = 24; 


function HomeScreen() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState(undefined);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.agify.io?name=${name}`,
      );
      const json = await response.json();
      setAge(json.age);
    } catch (error) {
      console.error(error);
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <View >
      <TextInput 
      style={{ 
        backgroundColor:'white',
        padding: SPACING,
        margin: SPACING,
        borderWidth: 1,
        fontSize: FONT_SIZE,

    }}
      value={name}
      onChangeText={setName}
      placeholder='Enter name'
      accessibilityLabel= "enter someone's name and we will guess their age"
      keyboardType='ascii-capable'
      autoComplete='given-name'

      />
      <Pressable
        onPress= {handleSubmit}
        accessibilityRole='button'
        style={{
        backgroundColor: 'blue',
        padding: SPACING,
        marginHorizontal: SPACING,
        borderRadius: 15,
        alignItems: 'center',
      }}>
        <Text style={{color: 'white', fontSize: FONT_SIZE}}>submit </Text>
      </Pressable> 
      {isLoading && (
        <ActivityIndicator size="large" style={{ margin: SPACING }} />
      )}
      {!!age && <Text style={{fontSize: FONT_SIZE, margin: SPACING}}>{`best guess? you are about ${age}`}</Text>}
      
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}