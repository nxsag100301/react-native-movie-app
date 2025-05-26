import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  View
} from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const ref = useRef<TextInput>(null)
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        ref.current?.focus()
      }, 100)
      return () => {
        ref.current?.blur()
        Keyboard.dismiss()
      }
    }, [])
  )
  const {
    data: movies,
    loading,
    error,
    refetch: reloadMovies,
    reset: resetLoadMovies
  } = useFetch(() => fetchMovies({ query: searchQuery }), false)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        reloadMovies()
      } else {
        resetLoadMovies()
      }
    }, 500)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])
  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        className='px-5'
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5 '>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center items-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5 '>
              <SearchBar
                value={searchQuery}
                ref={ref}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size='large'
                color='#0000ff'
                className='my-3'
              />
            )}
            {error && (
              <Text className='text-red--500 px-5 my-3'>
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search result for{' '}
                <Text className='text-accent '>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default Search
