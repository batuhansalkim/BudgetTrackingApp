import { View,Text, StyleSheet } from 'react-native';
import {useState} from "react";
import {Link,router} from "expo-router";
import {Button,Input,Card} from "../../components";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin=()=>{
        if(!email ||!password){
            setError("Lütfen tüm alanları doldurun");
            return;
        }
        router.replace('/(tabs)/home')
        
    }


    return(
        <View style={styles.container}>
            <Card style={styles.card}>
                <Input label="E-posta" value={email} onChangeText={setEmail} placeholder="E-posta adresinizi girin" error={error}/>
                <Input label="Şifre" value={password} onChangeText={setPassword} placeholder='Şifrenizi giriniz.' secureTextEntry/>
                <Button title="Giriş Yap" onPress={handleLogin} style={styles.button}/>

                <Link href="/(auth)/register" asChild>
                    <Button title="Hesabınız yok mu? Kayıt olun" style={styles.registerButton} variant='outline'/>
                </Link>
            </Card>
        </View>

    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black",
        justifyContent:"center",
    },
    card:{
        marginHorizontal: 20,
    },
    button:{
        marginTop: 16,
    },
    registerButton:{
        marginTop:8,
    }
})