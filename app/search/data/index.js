import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import api from "../../api";
import MovieBar from "../../Components/MovieBar";

export default function Index() {
  const { q } = useLocalSearchParams();

  const [LoadingState, setLoadingState] = useState(true)
  const [LoadingMore, setLoadingMore] = useState(false)

  const [HasMore, setHasMore] = useState(1)

  const [page, setpage] = useState(1)
  const [Data, setData] = useState([])

  useEffect(() => {
    setLoadingState(true)
    api.get(`search/multi?query=${q}`)
      .then((res) => {
        setData(res.data.results)
        setHasMore(res.data?.total_pages)
        setpage(2)
      })
      .finally(() => {
        setLoadingState(false)
      })
  }, [q])


  const LoadMore = () => {
    if (LoadingMore || HasMore <= page) {
      return
    }
    setLoadingMore(true)
    api.get(`search/multi?query=${q}&&page=${page}`)
      .then((res) => {
        setData(p => [...p, ...res.data.results])
      })
      .finally(() => {
        setLoadingMore(false)
        setpage(p => p + 1)
      })
  }




  if (LoadingState) {
    return <Loading />
  }

  return (
    <View style={{
      padding: 8
    }}>
      <Text
        style={{
          color: "white",
          padding:4
        }}
      >Search: {q}</Text>

      {
        Data.length == 0 &&
        <View style={{
          padding: 8,
          minHeight:400,
          justifyContent:"center",
          alignItems:"center"
        }}>
          <Text
            style={{
              color: "white"
            }}
          >NO DATA FOUND</Text>
        </View>

      }

      <View style={{
        gap: 8
      }}>
        {
          Data.length != 0 &&
          Data?.map((itm, idx) => {

            return <MovieBar id={itm?.id} type={itm?.media_type} rating={itm?.vote_average} image={itm?.backdrop_path} release_date={itm.release_date || itm?.first_air_date} name={itm?.orginal_title || itm?.title || itm?.name} key={idx} />
          })
        }

      </View>

      {
        LoadingMore &&
        <Loading/>
      }

      {
        HasMore>page && !LoadingMore &&

        <Pressable
          onPress={()=>{
            LoadMore()
          }}
          style={{
            padding:10,
            backgroundColor:"rgba(255,255,255,.2)",
            borderRadius:10,
            alignItems:"center",
            justifyContent:"center",
            margin:15
          }}
        >
          <Text
            style={{
              color:'white',
              fontSize:16
            }}
          >
            Loadmore
          </Text>
        </Pressable>
      }

    </View>
  );
}