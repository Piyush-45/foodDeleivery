import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { Product } from '@/src/types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Link, Stack, useSegments } from 'expo-router';
import { Tables } from '@/src/database.types';
import RemoteImage from './RemoteImage';

type ProductListItemProps = {
    product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments()
    console.log(segments)
    
    return (
        
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>

                <RemoteImage path={product.image} style={styles.image} />
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        maxWidth: '50%',
        // margin:10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 12,
        borderRadius: 8,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
});

export default ProductListItem;
