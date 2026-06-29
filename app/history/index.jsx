import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieBar from '../Components/MovieBar'

const index = () => {
  const [LoadingState, setLoadingState] = useState(true)

  const [MyHistory, setMyHistory] = useState([])

  const fetchData = async ()=>{
    const myData = await AsyncStorage.getItem('history')
   
    setMyHistory(JSON.parse(myData))
  }

  useEffect(() => {
   fetchData()
  }, [])
  
  return (
    <View style={{
      padding:5
    }}>
     <View style={{
      justifyContent:'space-between',
      flexDirection:"row",
      padding:14
     }}>
       <Text  style={{
      padding:5,
      fontSize:19,
      color:"white",
      fontWeight:"800"
    }}>History:</Text>

    <Pressable 
      onPress={async()=>{
        await AsyncStorage.removeItem('history')
        setMyHistory([])
      }}
    style={{
      width:80 ,
      padding:3,
      borderRadius:10,
      backgroundColor:"red",
      justifyContent:"center",
      alignItems:'center'
    }}>
      <Text 
       style={{
        color:"white"
       }}
      >
        Clear
      </Text>
    </Pressable>
     </View>
    {
      MyHistory?.length ==0 &&
      <View style={{
        height:300,
        backgroundColor:'rgba(244,244,244,.11)',
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Text  style={{
      padding:5,
      fontSize:19,
      color:"gray",
      fontWeight:"800"
    }}>No History</Text>

      </View>
      
    }

     {
      MyHistory?.length !==0 &&
      <View style={{
        gap:5
      }}>
      {
        MyHistory?.map((itm,idx)=>{
          return <MovieBar key={idx} name={itm.name} id={itm.id} realImage={itm.image} rating={itm?.rating} type={itm.type} release_date={itm?.release_date}/>
        })
      }

      </View>
      
    }
    </View>
  )
}

export default index