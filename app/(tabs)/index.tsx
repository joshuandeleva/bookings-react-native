import { Link } from 'expo-router'
import React from 'react'
import {View , Text} from 'react-native'
const Page = () => {
  return (
   <View>
        <Link href={"/(modals)/login"}>Login</Link>
        <Link href={"/(modals)/booking"}>Booking</Link>
        <Link href={'/listing/1'}>Listing Details</Link>
   </View>
  )
}

export default Page
