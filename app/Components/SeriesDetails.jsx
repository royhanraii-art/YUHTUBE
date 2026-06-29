import { View, Text, Image, Pressable } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Dot from './Dot';
import api from '../api';
import YoutubePlayer from "react-native-youtube-iframe";
import { Picker } from '@react-native-picker/picker';
import PlayerWebView from './PlayerWebView';
import Loading from './Loading';
import { useGeneral } from '../stores/GeneralStore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SeriesDetails = ({ data }) => {



    const [VideoData, setVideoData] = useState({})

    const [isShowingMore, setisShowingMore] = useState(false)



    const [Seasons, setSeasons] = useState([])

    const [episodes, setEpisode] = useState([])

    const [SelectedSeason, setSelectedSeason] = useState(1)
    const [SelectedEpisode, setSelectedEpisode] = useState(1)
    const [SelectedEpisodeData, setSelectedEpisodeData] = useState({})

    const [server, setServer] = useState(0)
    const [LoadingServer, setLoadingServer] = useState(true)
    const [ServersData, setServersData] = useState([])



    const setHistory = async () => {
        try {
            const historyDataUnparsed = await AsyncStorage.getItem("history");

            let parsedData = []

            if (historyDataUnparsed != null) {
                parsedData = JSON.parse(historyDataUnparsed);
            }

            let myDataThere = parsedData?.find((itm) => itm.id == data.id)

            let myData = parsedData?.filter((itm) => itm.id != data.id)

            myData = [{ id: data?.id, rating:data?.vote_average, release_date:data?.first_air_date ,  server: myDataThere?.server ? myDataThere.server : server, type: "tv", image: `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`, name: data?.name ,season: myDataThere?.season ? myDataThere.season : 1 , episode: myDataThere?.episode ? myDataThere.episode : 1 }, ...myData]


            await AsyncStorage.setItem("history", JSON.stringify(myData));
        } catch (error) {
            console.log("hwer"+error)
            alert("Failed setting History")
        }
    }


    const HandleAnyChange = useCallback(async (s,e) => {
        try {
            const historyDataUnparsed = await AsyncStorage.getItem("history");

            let parsedData = []

            if (historyDataUnparsed != null) {
                parsedData = JSON.parse(historyDataUnparsed);
            }

            let myData = parsedData?.filter((itm) => itm.id != data.id)

            myData = [{ id: data?.id, server: server,rating:data?.vote_average, release_date:data?.first_air_date , type: "tv", image: `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`, name: data?.name, season: s, episodes: e }, ...myData]

            await AsyncStorage.setItem("history", JSON.stringify(myData));
        } catch (error) {
            alert("Failed Getting History")

        }
    }, [])

    const getHistory = async () => {
        try {
            const historyDataUnparsed = await AsyncStorage.getItem("history");

            let parsedData = []

            if (historyDataUnparsed != null) {
                parsedData = JSON.parse(historyDataUnparsed);
            }

            const myData = parsedData?.find((itm) => itm.id == data.id)

            return {
                server: myData?.server == undefined ? 1 : myData?.server,
                season:myData?.season || 1,
                episode: myData?.episode || 1
            }
        } catch (error) {
            console.log(error)
            alert("Failed Getting History")
            return null
        }
    }

  

    useEffect(() => {
        const FetchAll = async () => {
            const historyData = await getHistory()

            if (historyData) {
                const { server ,season , episode} = historyData
                setServer(server)
                setSelectedEpisode(episode)
                setSelectedSeason(season)
            }

            await setHistory()
        }
        FetchAll()
    }, [])

    useEffect(() => {
        const historyData = getHistory()

        if (historyData) {
            const { server, season, episode } = historyData
            setServer(server)
            setSelectedSeason(season)
            setSelectedEpisode(episode)
        }

        setHistory()
    }, [])

    const backdropUrlSmall =
        `https://image.tmdb.org/t/p/w500${data?.production_companies[0]?.logo_path}`;;

    const backdropUrlSmallTrailer =
        `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`;

    useEffect(() => {
        if (!data.in_production) {
            return
        }

        api.get(`tv/${data?.id}/videos`)
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
            })
    }, [data])

    const today = new Date();




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

    useEffect(() => {
        const seasonsdata = data?.seasons?.filter(itm => (itm.name !== "Specials" || itm.season_number != 0))

        setSeasons(seasonsdata)
    }, [data])

    const [loadingSeasons, setloadingSeasons] = useState(true)

    useEffect(() => {
        setloadingSeasons(true)
        api.get(`tv/${data?.id}/season/${SelectedSeason}`)
            .then((res) => {
                let dataFetched = res.data.episodes
                setEpisode(dataFetched)
                setSelectedEpisode(1)
                setSelectedEpisodeData(dataFetched[0])


            })
            .catch(() => {
                alert("Cannot Fetch Trailer")
            })
            .finally(() => {
                setloadingSeasons(false)
            })
    }, [SelectedSeason])

    const isReleased = today > (new Date(SelectedEpisodeData?.air_date))

    const { ref } = useGeneral()
    return (
        <View
            style={{
                gap: 4
            }}
        >
            {
                isReleased ?
                    <PlayerWebView url={`https://player003.vercel.app/?server=${server}&&id=${data?.id}&&type=tv&&season=${SelectedSeason}&&episode=${SelectedEpisode}`} />
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
                !LoadingServer && ServersData.length > 1 && isReleased &&
                <Picker
                    selectedValue={server}
                    onValueChange={(value) => {
                        HandleAnyChange(SelectedSeason , SelectedEpisode)
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
                      <View style={{
                        flexDirection:"row",
                        gap:4
                      }}>
                          <Text style={{
                            color: 'white',
                            fontSize: 16
                        }}>
                            {data?.name}
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 16
                        }}>
                           S-{SelectedSeason} : EP-{SelectedEpisode}
                        </Text>
                      </View>
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
            {/* Picker  */}
            <Picker
                selectedValue={SelectedSeason}
                onValueChange={(value) => {
                    HandleAnyChange(value , 1)
                    setSelectedSeason(value)
                }}
                style={{ color: "white", backgroundColor: "black", gap: 3, borderWidth: 1, borderColor: "gray", borderRadius: 6 }}
                dropdownIconColor="white" // Android
            >

                {Seasons?.map((item, index) => (
                    <Picker.Item
                        style={{
                            color: "white",
                            backgroundColor: "black"
                        }}
                        key={index}
                        label={item.name || `Season ${index + 1}`}
                        value={item.season_number}
                        color="white"
                    />
                ))}
            </Picker>
            {/* Episodes  */}

            <Text style={{
                color: 'white',
                fontWeight: "800",
                fontSize: 19
            }}>
                Episodes:
            </Text>

            {
                loadingSeasons ?
                    <Loading /> :
                    <View style={{
                        gap: 6
                    }}>
                        {
                            episodes?.map((itm, idx) => {


                                const inputDate = new Date(itm.air_date);


                                const isAired = today > inputDate

                                const isSame = SelectedEpisode == itm?.episode_number

                                


                                return <Pressable
                                    onPress={() => {
                                        if (!isAired) {
                                            alert("Not Realeased Will Be Available soon")
                                            return
                                        }

                                        if (SelectedEpisode == itm?.episode_number) {
                                            return
                                        }
                                        setSelectedEpisode(itm?.episode_number)
                                        setSelectedEpisodeData(itm)

                                        HandleAnyChange(itm?.season_number , itm?.episode_number)

                                        ref?.current.scrollTo({
                                            y: 0,
                                            animated: true
                                        })
                                    }}
                                    key={idx}
                                    style={{
                                        backgroundColor: `${isSame ? "green" : "rgba(225,225,225,.11)"}`,
                                        borderRadius: 10,
                                        padding: 3
                                    }}

                                >
                                    <Image src={`https://image.tmdb.org/t/p/w500${itm.still_path}`} style={{
                                        height: 200
                                    }} />
                                    <View style={{
                                        padding: 5,
                                        flexDirection: "column",
                                        gap: "3"
                                    }}>
                                        <View
                                            style={{
                                                gap: 3,
                                                alignItems: "center",
                                                flexDirection: "row"
                                            }}
                                        >
                                            <Text style={{
                                                color: 'white',
                                                fontWeight: "800",
                                                fontSize: 19
                                            }}>
                                                {itm.name}
                                            </Text>

                                            <Dot />

                                            <Text style={{
                                                color: 'white',
                                                fontWeight: "700",
                                                fontSize: 14
                                            }}>
                                                {isAired ? "Released" : "Not Released Yet"}
                                            </Text>
                                            <Dot />
                                            <Text style={{
                                                color: 'white',
                                                fontWeight: "700",
                                                fontSize: 14
                                            }}>
                                                E-{itm?.episode_number}
                                            </Text>
                                        </View>
                                        <Text style={{
                                            color: 'white',
                                            fontWeight: "700"
                                        }}>
                                            {itm?.overview}
                                        </Text>

                                    </View>

                                </Pressable>
                            })
                        }
                    </View>
            }


        </View>
    )
}

export default SeriesDetails