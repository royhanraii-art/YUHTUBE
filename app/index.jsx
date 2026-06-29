import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieBar from './Components/MovieBar'
import { useHomeStore } from './stores/HomeStore'
import api from './api'
import Loading from './Components/Loading'

const index = () => {
  const {Movies , setFetched  } = useHomeStore()

  const TVS = useHomeStore(p=>p.TVS)

 
  return (
    <View style={{
        padding:10,
        gap:7
    }}>
       <Text
              style={{
                color:"white",
                fontSize:18,
                fontWeight:"800"
              }}
            >
              Home:
            </Text>
      {
        Movies?.map((itm,idx)=>{
          return <MovieBar id={itm?.id} type={itm?.media_type} rating={itm?.vote_average} image={itm?.backdrop_path}  release_date={itm.release_date} name={itm?.orginal_title || itm?.title}  key={idx}/>
        })
      }
     
      {
        TVS?.map((itm,idx)=>{

          return  <MovieBar id={itm?.id} type={itm?.media_type} rating={itm?.vote_average} image={itm?.backdrop_path}  release_date={itm.release_date || itm?.first_air_date} name={itm?.orginal_title || itm?.title || itm?.name}  key={idx}/>
        })
      }

      


    </View>
  )
}

export default index