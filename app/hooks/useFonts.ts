import * as Font from 'expo-font';

export const useFonts = async () => {
    try {
        await Font.loadAsync({
            InterBold: require('../assets/fonts/Inter-Bold.ttf'),
            InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
            InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
            InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
            InterLight: require('../assets/fonts/Inter-Light.ttf'),
        });
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
}; 