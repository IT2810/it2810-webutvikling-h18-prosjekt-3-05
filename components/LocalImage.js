import React from 'react';

import {
  Image,
  Dimensions
} from 'react-native'

/*** Adjust an image so it fits the device mobile proportions ***/
const LocalImage = ({source, originalWidth, originalHeight}) => {
  let windowWidth = Dimensions.get('window').width
  let widthChange = (windowWidth-230)/originalWidth
  let newWidth = originalWidth * widthChange
  let newHeight = originalHeight * widthChange

  return (
    <Image source={source} style={{width: newWidth, height: newHeight}} />
  )
}

export default LocalImage
