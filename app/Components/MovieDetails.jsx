import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dot from './Dot';
import api from '../api';
import YoutubePlayer from "react-native-youtube-iframe";
import { useGeneral } from '../stores/GeneralStore';
import PlayerWebView from './PlayerWebView';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieDetails = ({ data }) => {

    const [VideoData, setVideoData] = useState({})

    const [server, setServer] = useState(0)


    const setHistory = async () => {
        try {
            const historyDataUnparsed = await AsyncStorage.getItem("history");

            console.log(historyDataUnparsed)

            let parsedData = []

            if (historyDataUnparsed != null) {
                parsedData = JSON.parse(historyDataUnparsed);
            }

            let myDataThere = parsedData?.find((itm) => itm.id == data.id)

            let myData = parsedData?.filter((itm) => itm.id != data.id) 

            myData = [ { id: data?.id, rating:data?.vote_average, release_date:data?.release_date , server: myDataThere?.server ? myDataThere.server : 0, type: "movie", image: `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`, name: data?.original_title } , ...myData,]
            await AsyncStorage.setItem("history", JSON.stringify(myData));
        } catch (error) {
            console.log(error)
            alert("Failed setting History")
        }
    }


    const HandleServerChange = async (s) => {
        try {
            const historyDataUnparsed = await AsyncStorage.getItem("history");

            let parsedData = []

            if (historyDataUnparsed != null) {
                parsedData = JSON.parse(historyDataUnparsed);
            }

            let myData = parsedData?.filter((itm) => itm.id != data.id)

            myData = [ { id: data?.id, server: s, rating:data?.vote_average, release_date:data?.release_date , type: "movie", image: `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`, name: data?.original_title } , ...myData]

            await AsyncStorage.setItem("history", JSON.stringify(myData));
        } catch (error) {
            alert("Failed Getting History")

        }
    }
    const getHistory = async () => {
        try {
            const historyDataUnparsed = await AsyncStorage.getItem("history");

            let parsedData = []

            if (historyDataUnparsed != null) {
                parsedData = JSON.parse(historyDataUnparsed);
            }

            const myData = parsedData?.find((itm) => itm.id == data.id)
           
            return {
                server: myData?.server==undefined?1 :  myData?.server,
            }
        } catch (error) {
            alert("Failed Getting History")
            return null
        }
    }

    useEffect(() => {
      const  FetchAll =async ()=>{
          const historyData = await getHistory()

        if (historyData) {
            const { server } = historyData
            setServer(server)
        }

       await setHistory()
      }
      FetchAll()
    }, [])



    const [isShowingMore, setisShowingMore] = useState(false)

    const backdropUrlSmall =
        `https://image.tmdb.org/t/p/w500${data?.production_companies[0]?.logo_path}`;;

    const backdropUrlSmallTrailer =
        `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`;

    useEffect(() => {
        if (data.status == "Released") {
            return
        }

        api.get(`movie/${data?.id}/videos`)
            .then((res) => {
                let dataFetched = res.data.results
                const trailer = dataFetched.find((itm) => {
                    if (itm.type == "Trailer") {
                        return itm
                    }
                })

                setVideoData(trailer)
            })
            .catch(() => {
                alert("Cannot Fetch Trailer")
            })
    }, [data])

    const [LoadingServer, setLoadingServer] = useState(true)
    const [ServersData, setServersData] = useState([])

    useEffect(() => {
        setLoadingServer(true)
        fetch("https://player003.vercel.app/api/")
            .then((res) => res.json())
            .then(data => {
                setServersData(data.servers)
            })
            .catch(() => {
                alert("Couldnot Get any Server ")
            })
            .finally(() => {
                setLoadingServer(false)
            })
    }, [data])

    return (
        <View
            style={{
                gap: 4
            }}
        >
            {
                data.status == "Released" ?
                    <PlayerWebView url={`https://player003.vercel.app/?server=${server}&&id=${data?.id}&&type=movie`} />
                    :
                    VideoData.key ?
                        <YoutubePlayer
                            height={220}
                            play={true}
                            videoId={VideoData?.key}
                            mute={false}
                            initialPlayerParams={{
                                controls: false,
                                modestbranding: true,
                                rel: false,
                                playsinline: true,
                            }}
                        />
                        : <Image src={backdropUrlSmallTrailer} style={{
                            flex: 1,
                            backgroundColor: "rgb(246, 239, 239,.15)",
                            borderRadius: 10,
                            height: 300,

                        }} />


            }
            {
                !LoadingServer && ServersData.length > 1 && data.status == "Released" &&
                <Picker
                    selectedValue={server}
                    onValueChange={(value) => {
                        HandleServerChange(value)
                        setServer(value)
                    }}
                    style={{ color: "white", backgroundColor: "black", gap: 3, borderWidth: 1, borderColor: "grey", borderRadius: 6 }}
                    dropdownIconColor="white" // Android
                >


                    {ServersData?.map((item, index) => (
                        <Picker.Item
                            style={{
                                color: "white",
                                backgroundColor: "black"
                            }}
                            key={index}
                            label={item.name || `Server ${index + 1}`}
                            value={index}
                            color="white"
                        />
                    ))}
                </Picker>
            }

            {/* Details  */}

            <View style={{
                backgroundColor: "rgb(246, 239, 239,.15)",
                borderRadius: 10,
                padding: 6,
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4
                }}>
                    <Image style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: 'rgba(230, 217, 217, 0.21)',

                    }} src={backdropUrlSmall} ></Image>
                    <View>
                        <Text style={{
                            color: 'white',
                            fontSize: 16
                        }}>
                            {data?.original_title}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Text style={{
                                color: 'gray',
                                fontSize: 14,
                                fontWeight: "700"
                            }}>
                                {data?.production_companies[0]?.name}
                            </Text>
                            <Dot />
                            <Text style={{
                                color: 'gray',
                                fontSize: 13,
                            }}>
                                {data?.status}
                            </Text>

                            <Dot />

                            <Pressable
                                onPress={() => {
                                    setisShowingMore(p => !p)
                                }}
                                style={{
                                    padding: 4,
                                    borderRadius: 6,
                                    backgroundColor: "rgba(233, 219, 219, 0.09)"
                                }}>
                                {
                                    isShowingMore ?
                                        <Text style={{
                                            color: 'gray',
                                            fontSize: 14,
                                        }}>
                                            Show Less ^
                                        </Text> :
                                        <Text style={{
                                            color: 'gray',
                                            fontSize: 14,
                                        }}>
                                            Show More +
                                        </Text>
                                }
                            </Pressable>
                        </View>

                    </View>

                </View>
                {
                    isShowingMore &&
                    <View style={{
                        padding: 4
                    }}>
                        <Text style={{
                            color: "gray",
                            fontWeight: "800"
                        }}>
                            Description:
                        </Text>
                        <Text style={{
                            color: "grey",
                            textAlign: "justify"
                        }}>
                            {data?.overview}
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                color: "gray",
                                fontWeight: "800"
                            }}>
                                Genre:
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: "center",
                                gap: 2
                            }}>
                                {
                                    data?.genres?.map((itm, idx) => {
                                        return (
                                            <Text style={{
                                                padding: 3,
                                                backgroundColor: "rgba(245, 242, 242, 0.05)",
                                                borderRadius: 4,
                                                color: "grey"
                                            }} key={idx}>
                                                {itm.name}
                                            </Text>
                                        )
                                    })
                                }
                            </View>

                        </View>
                        <Text style={{
                            color: "gray",
                            fontWeight: "800"
                        }}>
                            Tagline:
                        </Text>
                        <Text style={{
                            color: "grey",
                            textAlign: "justify"
                        }}>
                            {data?.tagline}
                        </Text>


                        <Text style={{
                            color: 'gray',
                            fontSize: 15,
                        }}>
                            Released Date: {data?.release_date}
                        </Text>
                    </View>
                }
            </View>


        </View>
    )
}

export default MovieDetails