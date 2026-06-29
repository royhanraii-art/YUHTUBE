import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import api from "../../api";
import MovieDetails from "../../Components/MovieDetails";
import Loading from "../../Components/Loading";
import MovieBar from "../../Components/MovieBar";
import SeriesDetails from "../../Components/SeriesDetails";



const Index = () => {
  const { id, type } = useLocalSearchParams();

  const [LoadingState, setLoadingState] = useState(true)
  const [Data, setData] = useState({})
  const [DataSimilar, setDataSimilar] = useState([])


 


  useEffect(() => {
    setLoadingState(true)
    api.get(`${type}/${id}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((er) => {
        alert("Some Error Occured")
      })
      .finally(() => {
        setLoadingState(false)
      })

      return ()=>{
        setLoadingState(true)
        setData({})
      }

  }, [id])

  const [LoadingRelated, setLoadingRelated] = useState(true)

  useEffect(() => {
    setLoadingRelated(true)

    api.get(`${type}/${id}/similar`)
      .then((res) => {
        setDataSimilar(res.data.results)

      })
      .catch(() => {
        alert("Some Error Occured")
      })
      .finally(() => {
        setLoadingRelated(false)
      })

  }, [id])


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        padding: 5,
        gap: 5

      }}
    >
      {
        LoadingState ?
          <Loading />
          :
          type == 'movie' ?
            <MovieDetails  data={Data} />
            : <SeriesDetails data= {Data}/>
      }
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "800"
        }}
      >
        More Like This: 
      </Text>

     
      <ScrollView>
        {
          LoadingRelated ?
            <Loading />
            :
            <View
              style={{
                gap: 8
              }}
            >
              {
                DataSimilar?.map((itm, idx) => {
                  return  <MovieBar id={itm?.id} type={itm?.media_type || type} rating={itm?.vote_average} image={itm?.backdrop_path}  release_date={itm.release_date || itm?.first_air_date} name={itm?.orginal_title || itm?.title || itm?.name}  key={idx}/>
                })
              }
            </View>
        }
      </ScrollView>
    </View>
  );
};

export default Index;