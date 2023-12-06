import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import React , {useCallback} from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { TextInput } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

// WebBrowser.maybeCompleteAuthSession()


enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook'
}

export default function Page() {
    useWarmUpBrowser();

    const router = useRouter()

    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })


    // generic function

    const onSelectAuth = useCallback(async (strategy: Strategy) => {

        // select strategy => create a object with key and value to select each auth using enum

        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth

        }[strategy];

        try {
            const {createdSessionId , setActive} = await selectedAuth()

            console.log(createdSessionId , 'session started')

            if(createdSessionId){
                setActive!({session:createdSessionId})
                router.back()
            }
        } catch (error) {
            console.error('OAuth error', error)
            
        }

    },[])


    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' placeholder='email' style={[defaultStyles.inputField, { marginBottom: 30 }]} />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />

                <Text style={styles.separator}>or</Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />

            </View>
            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons size={24} name='call-outline' style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with phone</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSelectAuth(Strategy.Apple)} style={styles.btnOutline}>
                    <Ionicons size={24} name='md-logo-apple' style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} style={styles.btnOutline}>
                    <Ionicons size={24} name='md-logo-google' style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSelectAuth(Strategy.Facebook)} style={styles.btnOutline}>
                    <Ionicons size={24} name='md-logo-facebook' style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    separator: {
        color: Colors.grey,
        fontFamily: 'mon-sb'
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb'
    },

})