import { StatusBar } from 'react-native'
import './globals.css'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='movies/[id]' />
      </Stack>
    </>
  )
}
