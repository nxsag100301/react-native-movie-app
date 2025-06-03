import { icons } from '@/constants/icons'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Image, TextInput, TouchableWithoutFeedback, View } from 'react-native'

interface Props {
  onPress?: () => void
  value?: string
  onChangeText?: (text: string) => void
}

interface SearchBarRef {
  focus: () => void
  blur: () => void
}

const SearchBar = forwardRef<SearchBarRef, Props>(
  ({ onPress, value, onChangeText }, ref) => {
    const inputRef = useRef<TextInput>(null)
    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus()
      },
      blur() {
        inputRef.current?.blur()
      }
    }))

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
          <Image
            source={icons.search}
            className='size-5'
            resizeMode='contain'
            tintColor='#ab8bff'
          />
          <TextInput
            ref={inputRef}
            placeholder='Search...'
            placeholderTextColor='#a8b5db'
            value={value}
            onChangeText={onChangeText}
            className='flex-1 ml-2 text-white'
            pointerEvents={onPress ? 'none' : undefined}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export default SearchBar
