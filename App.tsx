import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import FilePicker from './src/components/FilePicker';
import ProjectTable from './src/components/ProjectTable';
import { parseCSVAndCalculate } from './src/utils/csvParser';
import appStyles from './src/styles/appStyles';
import { LongestPairResult } from './src/types/longestPairResult';
import LoadingOverlay from './src/components/LoadingOverlay';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LongestPairResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleFilePicked = async (uri: string) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const calculatedResult: LongestPairResult = await parseCSVAndCalculate(uri);
      setResult(calculatedResult);
    } catch (err: any) {
      console.error('Error processing file:', err);
      setError(`Error processing file: ${err.message || 'Please check the file format.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={appStyles.container}>
      <Text style={appStyles.title}>Employee Project Overlap</Text>
      <FilePicker onFilePicked={handleFilePicked} hasSelection={!!result} />

      <LoadingOverlay isVisible={loading} message="Calculating longest working pair..." />

      {error ? <Text style={appStyles.errorText}>{error}</Text> : null}

      {result && (
        <View style={appStyles.resultContainer}>
          <Text style={appStyles.subtitle}>
            Longest Working Pair: Employee {result.emp1} & Employee {result.emp2} (Total Overlap:{' '}
            {result.totalDays} Days)
          </Text>
          <ProjectTable commonProjects={result.commonProjects} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
