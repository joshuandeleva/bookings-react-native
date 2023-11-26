import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
    // useEffect(()=>{
    //     void WebBrowser.warmUpAsync();
    //     return () =>{
    //         void WebBrowser.coolDownAsync();
    //     }
    // },[])

    useEffect(() => {
        const warmUpBrowser = async () => {
          try {
            await WebBrowser.warmUpAsync();
            console.log('ExpoWebBrowser warmed up successfully');
          } catch (error) {
            console.error('Error warming up ExpoWebBrowser', error);
          }
        };
       
        warmUpBrowser();
      
        return () => {
          WebBrowser.coolDownAsync();
        };
      }, []);
}