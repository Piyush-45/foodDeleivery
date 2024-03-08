import { supabase } from '@/src/lib/supabase';
import { Link, Stack } from 'expo-router';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const signInWithEmail = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'sign in' }} />
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} disabled={loading} onPress={signInWithEmail}>
                <Text style={styles.buttonText}>{loading ? 'signing in' : 'sign in '}</Text>
            </TouchableOpacity>
            {/* <Button text={loading?'signing in': 'sign in'} style={{width:'100%'}}/> */}
            <TouchableOpacity >
                <Link href={'/sign-up'}>
                    <Text style={styles.link}>Don't have an account? Sign Up</Text></Link>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default SignInScreen;
