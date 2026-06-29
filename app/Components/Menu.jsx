import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Dot from './Dot'

const Menu = ({setshowMenu}) => {
    return (
        <Pressable
            onPress={()=>{
                setshowMenu(false)
            }}
            style={{
                backgroundColor: "rgba(13, 12, 12, 0.4)",
                borderRadius: 10,
                position: "absolute",
                zIndex: 10,
                right: 0,
                top: 0,
                bottom:0,
                width: '100%',
                alignItems:'flex-end',
                padding:40
            }}
        >
            <View style={{
                backgroundColor: "rgba(13, 12, 12, 0.6)",
                width: 250,
                flexDirection: "column",
                padding: 10,
                gap: 5
            }} >
                <Link style={{
                    padding: 4,
                    backgroundColor: 'rgba(224, 212, 218, 0.29)',
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15

                }} href={'/'}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        Home
                    </Text>
                </Link>
                <Link style={{
                    padding: 4,
                    backgroundColor: 'rgba(224, 212, 218, 0.29)',
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15

                }} href={'/movies'}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        Movies
                    </Text>
                </Link>
                <Link style={{
                    padding: 4,
                    backgroundColor: 'rgba(224, 212, 218, 0.29)',
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15

                }} href={'/tv'}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        TV
                    </Text>
                </Link>

                <Link style={{
                    padding: 4,
                    backgroundColor: 'rgba(224, 212, 218, 0.29)',
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15

                }} href={'/history'}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        History
                    </Text>
                </Link>

                <Link style={{
                    padding: 4,
                    backgroundColor: 'rgba(224, 212, 218, 0.29)',
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15

                }} href={'/live'}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        Live Matches
                    </Text>
                </Link>
                <Text style={{
                    textAlign: "center",
                    color: 'gray',
                    fontWeight: "700",
                    fontSize: 12
                }}>
                    <Dot /> Made By Prajwal <Dot />
                </Text>
            </View>
        </Pressable>
    )
}

export default Menu