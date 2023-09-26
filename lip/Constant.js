import { Dimensions } from 'react-native';

const screenDimensions = {
    ScreenWidth: Dimensions.get('screen').width,
    ScreenHeight: Dimensions.get('screen').height,
    WindowWidth: Dimensions.get('window').width,
    WindowHeight: Dimensions.get('window').height,
}

export default screenDimensions