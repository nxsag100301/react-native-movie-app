import { View, Image, TextInput } from 'react-native'
import { icons } from '@/constants/icons'

interface Props {
  onPress?: () => void
}

const SearchBar = ({ onPress }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor='#ab8bff'
      />
      <TextInput
        onPress={onPress}
        placeholder='Search...'
        placeholderTextColor='#a8b5db'
        value=''
        // value={searchValue}
        // onChangeText={(text) => setSearchValue(text)}
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar
