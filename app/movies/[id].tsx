import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'

interface MovieInfoProps {
  label: string
  value?: string | number | null
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className='flex flex-col items-start justify-center mt-5 '>
      <Text className='text-light-200 font-normal text-sm '>{label}</Text>
      <Text className='text-light-100 font-bold text-sm mt-2'>
        {value || 'N/A'}{' '}
      </Text>
    </View>
  )
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  )
  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
            }}
            className='w-full h-[550px] rounded'
            resizeMode='stretch'
          />
        </View>
        <View className='mt-[17px] mx-[20px]'>
          <Text className='text-white font-bold text-xl mb-[6px]'>
            {movie?.title}
          </Text>
          <Text className='text-light-200 font-normal text-sm leading-[175%] mb-[6px]'>
            {movie?.release_date}
          </Text>
          <View className='flex-row gap-x-1 items-center bg-dark-100 py-2 px-2.5 rounded self-start'>
            <Image source={icons.star} />
            <Text className='text-white font-bold text-sm'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-light-200 text-sm'>
              {movie?.vote_count} Votes
            </Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview} />
          <View className='flex flex-row gap-8 w-full'>
            <View className='w-3/5'>
              <MovieInfo label='Release date' value={movie?.release_date} />
            </View>
            <View className='w-2/5'>
              <MovieInfo label='Status' value={movie?.status} />
            </View>
          </View>
          <MovieInfo
            label='Genres'
            value={movie?.genres.map((g) => g.name).join(' - ') || 'N/A'}
          />
          <MovieInfo
            label='Countries'
            value={
              movie?.production_countries.map((c) => c.name).join(' - ') ||
              'N/A'
            }
          />
        </View>
        <TouchableOpacity
          className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg
           py-3.5 flex flex-row items-center justify-center'
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className='size-5 mr-1 mt-0.5 rotate-180'
            tintColor='#fff'
          />
          <Text className='text-white font-semibold text-base'>Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default MovieDetails
