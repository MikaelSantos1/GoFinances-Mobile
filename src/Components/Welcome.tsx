import { View, Text } from 'react-native'
import React from 'react'

interface WelcomeProps{
    title:string
}
export default function Welcome({title}:WelcomeProps) {
  return (
    <View>
      <Text>React bearer workflow com TS</Text>
    </View>
  )
}