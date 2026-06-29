import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = () => {
  const [SearchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('searchHistory')
      if (data == null || !data) {
        return
      }
     
      setSearchHistory(JSON.parse(data))
    }
    getData()
  }, [])

  const [query, setquery] = useState('')

  const HandleSearch = async (data)=>{
    console.log(data)
    if(!data){
      return
    }

    let myData = [data , ...SearchHistory]

    console.log(myData)

    await AsyncStorage.setItem("searchHistory", JSON.stringify(myData))

    router.push(`/search/data?q=${data}`)
  }
  return (
    <View style={{
      padding: 10
    }} >
      <View
        onPress={() => {
          router.push('/search')
        }}
        style={{
          borderWidth: .4,
          flex: 1,
          borderColor: "grey",
          borderCurve: "circular",
          borderRadius: 5,
          flexDirection: "row",
          overflow: "hidden",
          alignItems: "center",
          paddingHorizontal: 14
        }}>
        <TextInput placeholder='Search Here' placeholderTextColor={'white'} style={{
          flex: 1,
          fontSize: 14,
          color: "white"
        }} 
        value={query}
        onChangeText={(text)=>{setquery(text)}}
        
        />

        <Pressable 
          onPress={()=>{
            HandleSearch(query)
          }}
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{
            color: 'white',
            fontSize: 20
          }}>🔍</Text>
        </Pressable>
      </View>
      <View style={{
        justifyContent: 'space-between',
        flexDirection: "row",
        padding: 14
      }}>
        <Text style={{
          padding: 5,
          fontSize: 19,
          color: "white",
          fontWeight: "800"
        }}>Search History:</Text>

        <Pressable
          onPress={async () => {
            await AsyncStorage.removeItem('searchHistory')
            setSearchHistory([])

          }}
          style={{
            width: 80,
            padding: 3,
            borderRadius: 10,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: 'center'
          }}>
          <Text
            style={{
              color: "white"
            }}
          >
            Clear
          </Text>
        </Pressable>
      </View>
      {
        SearchHistory?.length == 0 &&
        <View style={{
          height: 300,
          backgroundColor: 'rgba(244,244,244,.11)',
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{
            padding: 5,
            fontSize: 19,
            color: "gray",
            fontWeight: "800"
          }}>No History</Text>

        </View>

      }


      {
        SearchHistory?.length !== 0 &&
        <View style={{
          backgroundColor: 'rgba(244,244,244,.11)',
          gap: 4,
          flexWrap: 'wrap',
          padding:10,
          flexDirection:"row"
        }}>
          {
            SearchHistory.map((itm, idx) => {
              return <Pressable key={idx} 
              onPress={()=>{
                  router.push(`/search/data?q=${itm}`)
              }}
              style={{
                backgroundColor: 'rgba(244,244,244,.11)',
                padding:4,
                justifyContent:'center',
                alignItems:"center",
                minWidth:100,
                borderRadius:8,
                height:'auto'
              }}>
              <Text 
                style={{
                  color:"white"
                }}
              >
                  {itm}
              </Text>
              </Pressable>
            })
          }
        </View>


      }
    </View>
  )
}

export default index