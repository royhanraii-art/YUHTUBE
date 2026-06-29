import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useHomeStore } from '../stores/HomeStore'
import MovieBar from '../Components/MovieBar'
import api from '../api'

const index = () => {
  const { Movies, AddMovies } = useHomeStore()
  useEffect(() => {
    api.get('movie/top_rated')
      .then((res) => {
        AddMovies(res.data.results)
      })

       api.get('movie/popular')
      .then((res) => {
        AddMovies(res.data.results)
      })

  }, [])

  return (
    <View style={{
      padding: 10,
      gap: 7
    }}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "800"
        }}
      >
        Movies:
      </Text>
      {
        Movies?.map((itm, idx) => {
          return <MovieBar id={itm?.id} type={itm?.media_type} rating={itm?.vote_average} image={itm?.backdrop_path} release_date={itm.release_date} name={itm?.orginal_title || itm?.title} key={idx} />
        })
      }

    </View>
  )
}

export default index