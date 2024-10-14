import { View, Text, SafeAreaView, ScrollView, Image, Alert, Linking, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { Color, colors, fonts } from '../../utils'

import { MyGap, MyInput } from '../../components'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import { api_token, apiURL, MYAPP, storeData } from '../../utils/localStorage'
import MyLoading from '../../components/MyLoading'


export default function Login ({navigation}) {
    const [kirim, setKirim] = useState({
        api_token: api_token,
        username:'',
        password:'',

        
    })

    const [loading, setLoading] = useState(false); // Tambahkan state loading

    const handleWA = async () => {
        const phoneNumber = '6285155153923';
        const message = 'Hello, saya ingin ganti password.';  // Definisikan message di sini
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
        Linking.openURL(url).catch(() => {
          Alert.alert("MyApp", "ERROR, GAGAL MEMBUKA WA");
        });
      };
      
      

    const handleLogin = () => {
   
        if(kirim.username.length == 0) {
            showMessage({
                type : 'default',
                color : 'white',
                backgroundColor: colors.danger,
                message: 'Tolong isi username!'
            })
        } else if (kirim.password.length == 0 ) {
            showMessage({
                type : 'default',
                color : 'white',
                backgroundColor: colors.danger,
                message: 'Tolong isi passowrd!'
            })
        } else {
            console.log(kirim);
            setLoading(true)
            

            axios
            .post(apiURL + 'login', kirim)
            .then(response => {
                setLoading(true)
                console.log(response.data);
                 if (response.data.status == 200) {
                    console.log(response.data)
                    storeData('user', response.data);
                    navigation.replace("MainApp");
                    Alert.alert(MYAPP, "Login berhasil!");
                 } else {
                    setLoading(false);
                    showMessage({
                        type:'default',
                        color:'white',
                        backgroundColor:colors.danger,
                        message:'Username atau password salah!'
                    })
                 }
            })
    
            .catch(error => {
                setLoading(false)
                console.error(error)
            })
        }
    }

  return (
    <SafeAreaView style={{
        flex:1,
    }}>

{loading && <MyLoading />}

    <ImageBackground source={require('../../assets/bglogin.png')} style={{
        width:"100%",
        height:"100%",
        flex:1,
    }}>

<ScrollView>
        <ImageBackground source={require('../../assets/bglogin.png')} style={{
            flex:1,
            width:"100%",
            height:'100%',

        }}> 
            <View style={{
                padding:20,

            }}>



             <View style={{padding:10, marginTop:'100%'}}>
             <Text style={{fontFamily:fonts.primary[700], color:colors.white,
                fontSize:25, textAlign:'center', }}>Masuk</Text>


                <View style={{marginTop:30}}>
                    <MyInput value={kirim.username} onChangeText={(x) => setKirim({...kirim, username : x})} label="Username" placeholder="Isi Username"/>
                    <MyGap jarak={10}/>
                    <MyInput  value={kirim.password} onChangeText={(x) => setKirim({...kirim, password: x})} label="Kata Sandi" placeholder="Isi Kata Sandi" secureTextEntry={true}/>
                    <MyGap jarak={10}/>
                   <TouchableOpacity onPress={handleWA}>
                    <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                    <Text style={{
                        fontFamily:fonts.primary[500],
                        color:colors.white,
                        
                    }}>Lupa Kata Sandi</Text>
                    </View>
                   </TouchableOpacity>


                   {/* TOMBOL LOGIN */}
                   <View style={{
                    marginTop:20
                   }}>
                   <TouchableWithoutFeedback onPress={handleLogin}>
                    <View style={{
                        padding:10,
                        backgroundColor:colors.button,
                        borderRadius:20,
                        borderWidth:2,
                        borderColor:Color.blueGray[400]

                    }}>
                                <Text style={{
                                    fontFamily:fonts.primary[700],
                                    fontSize:15, textAlign:"center",
                                    color:colors.primary,

                                }}>Masuk</Text>
                    </View>
                   </TouchableWithoutFeedback>
                    </View>
                   {/* END TOMBOL LOGIN */}

                   {/* TOMBOL REGISTER */}
                   <View style={{
                    padding:10,
                   }}>

                   <View style={{
                    marginTop:60
                   }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Register")}>
                        <View>
                        <Text style={{
                        fontFamily:fonts.primary[600],
                        fontSize:15, 
                        textAlign:'center',
                        color:colors.white,

                    }}>Belum memiliki akun? Silakan <Text style={{
                        fontFamily:fonts.primary[700]
                    }}>Daftar</Text></Text>
                        </View>
                    </TouchableWithoutFeedback>
                   </View>

                   </View>
                </View>
             </View>

            </View>
            </ImageBackground>
        </ScrollView>
    </ImageBackground>

       
       
    </SafeAreaView>
  )
}