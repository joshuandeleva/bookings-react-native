import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    // get the id 
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>List page</Text>
        </View>
    )
}

export default Page