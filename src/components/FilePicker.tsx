import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { pick, types, isErrorWithCode } from '@react-native-documents/picker';

interface FilePickerProps {
  onFilePicked: (uri: string) => void;
  hasSelection: boolean;
}

const FilePicker = ({ onFilePicked, hasSelection }: FilePickerProps) => {
  const pickDocument = async () => {
    try {
      const result = await pick({
        allowMultiSelection: false,
        type: [types.csv],
      });

      if (result && result.length > 0 && result[0].uri) {
        onFilePicked(result[0].uri);
      } else {
        console.log('User cancelled selection or no URI found.');
      }
    } catch (err: any) {
      if (isErrorWithCode(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>
          {hasSelection ? 'Select another CSV File' : 'Select CSV File'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilePicker;
