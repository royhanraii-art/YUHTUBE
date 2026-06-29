import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

const Navbar = ({showMenu , setshowMenu}) => {
  return (
    <View style={{
        padding:4,
        paddingVertical:15,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:'grey',
        paddingHorizontal:10,
        gap:8
    }}>
      <Link href={"/"}>
        <Text style={{
            color:'blue',
            fontWeight:600,
            fontSize:20
        }}>
            YUH
        </Text>
        <Text  style={{
            color:'white',
            fontWeight:600,
            fontSize:20
        }}>
            TUBE
        </Text>
      </Link>

      <Pressable
        onPress={()=>{
          router.push('/search')
        }}
      style={{
        borderWidth:.4,
        flex:1,
        borderColor:"grey",
        borderCurve:"circular",
        borderRadius:5,
        flexDirection:"row",
        overflow:"hidden",
        alignItems:"center",
        paddingHorizontal:14
      }}>
       <Text style={{
        flex:1,
        fontSize:16,
        color:"white"
       }}>
        Search YuhTube
       </Text>
        <Pressable style={{
        width:40,
        height:40,
        justifyContent:"center",
        alignItems:"center"
      }}>
         <Text style={{
            color:'white',
            fontSize:20
        }}>🔍</Text>
      </Pressable>
      </Pressable>
      <Pressable onPress={()=>{
        setshowMenu(p=>!p)
      }} style={{
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Text style={{
            color:'white',
            fontSize:34,
            fontWeight:800
        }}>
            {
                showMenu?"×":"⁞"
            }
        </Text>
      </Pressable>
    </View>
  )
}

export default Navbar