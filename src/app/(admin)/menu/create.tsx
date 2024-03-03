import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import defaultImage from "../../../../src/dp.jpg"
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import Button from '../../components/Button';

const CreateProductScreen = () => {
  const { id } = useLocalSearchParams()
  const isUpdating = !!id

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCreate = () => {
    // Reset previous error message
    setErrorMessage('');

    // Check if name is empty
    if (!name.trim()) {
      setErrorMessage('Please enter a name for the product.');
      return;
    }

    // Check if price is empty or not a number
    if (!price.trim() || isNaN(parseFloat(price))) {
      setErrorMessage('Please enter a valid price for the product.');
      return;
    }

    // All validations passed, perform creation action
    // For now, just clearing the input fields
    setName('');
    setPrice('');
    alert('Product created successfully.');
  };

  const onUpdate = () => {
    // Reset previous error message
    setErrorMessage('');

    // Check if name is empty
    if (!name.trim()) {
      setErrorMessage('Please enter a name for the product.');
      return;
    }

    // Check if price is empty or not a number
    if (!price.trim() || isNaN(parseFloat(price))) {
      setErrorMessage('Please enter a valid price for the product.');
      return;
    }

    // All validations passed, perform creation action
    // For now, just clearing the input fields
    setName('');
    setPrice('');
    alert('Product created successfully.');
  };


  const handleSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onDelete = () => {
    console.log('Delete')
  }
  const confirmDelete = () => {
    Alert.alert("Confirm", "are you sure you want to delete", [
      {
        text: 'cancel'
      }, {
        text: 'Delete',
        style: 'destructive',
        onPress:onDelete
      }
    ])
  }


  return (

    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'update Product' : 'create product' }} />

      <Image source={{ uri: image }} style={{ width: '50%', height: 100, resizeMode: 'cover', borderRadius: 100, alignSelf: 'center', aspectRatio: 1, }} />
      <TouchableOpacity><Text onPress={pickImage} style={{ color: 'skyblue', fontSize: 14, textAlign: 'center' }}>Select Image</Text></TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isUpdating ? 'Update' : 'Create'}</Text>
      </TouchableOpacity>

      {isUpdating && <Button text='delete' onPress={confirmDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    gap: 10
    // alignItems:'c'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    // backgroundColor:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CreateProductScreen;
