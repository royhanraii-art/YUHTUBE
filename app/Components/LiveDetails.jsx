import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Dot from './Dot'
import { router } from 'expo-router'

const LiveDetails = ({ data }) => {
    const HandlePress = () => {
        router.push({
            pathname: "/live/watch",
            params: {
                uris: JSON.stringify(data?.sources),
                embed:data?.embed
            },
        })
    }
    return (
        <Pressable onPress={HandlePress} style={{
            backgroundColor: "rgba(233,233,233,.13)",
            padding: 3
        }} >
            <Image style={{
                borderRadius: 5
            }} src={data?.image} height={200} />
            <View style={{
                padding: 4
            }}>
                <Text style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: "800"
                }}>
                    {data?.title}
                </Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4
                }}>
                    <Text style={{
                        fontSize: 13,
                        color: 'grey',
                        fontWeight: "800"
                    }}>
                        {data.name}
                    </Text>
                    <Dot />
                    <Text style={{
                        fontSize: 13,
                        color: 'grey',
                        fontWeight: "800"
                    }}>
                        {data.league}
                    </Text>
                    <Dot />
                    <Text style={{
                        fontSize: 13,
                        color: 'grey',
                        fontWeight: "800"
                    }}>
                        {data.status}
                    </Text>
                    <Dot />
                    {
                        data.status == "live" &&

                        <Text style={{
                            fontSize: 13,
                            color: 'white',
                            fontWeight: "800",
                            padding: 3,
                            width: 53,
                            backgroundColor: "red",
                            textAlign: 'center'
                        }}>
                            {data.status}
                        </Text>
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default LiveDetails