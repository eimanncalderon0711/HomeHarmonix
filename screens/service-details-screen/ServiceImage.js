import { View, Image, Dimensions, Text } from 'react-native';
import React from 'react';
import { apiUrl } from '../../apiUrl';

const { width } = Dimensions.get('window');

const ServiceImage = ({ image, id }) => {
    return (
        <View style={{width:width, height:'100%'}}>
            {image ? <Image source={{uri:image}} resizeMode='cover' className="w-fit h-full"/> : <Text>No Image </Text>}
        </View>
    );
};

export default ServiceImage;
