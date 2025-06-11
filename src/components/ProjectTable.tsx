import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CommonProjectDetail } from '../types/CommonProjectDetail';

interface ProjectTableProps {
  commonProjects: CommonProjectDetail[];
}

const ProjectTable = ({ commonProjects }: ProjectTableProps) => {
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Emp ID #1</Text>
      <Text style={styles.headerText}>Emp ID #2</Text>
      <Text style={styles.headerText}>Project ID</Text>
      <Text style={styles.headerText}>Days</Text>
    </View>
  );

  const renderItem = ({ item }: { item: CommonProjectDetail }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataText}>{item.emp1Id}</Text>
      <Text style={styles.dataText}>{item.emp2Id}</Text>
      <Text style={styles.dataText}>{item.projectId}</Text>
      <Text style={styles.dataText}>{item.daysWorked}</Text>
    </View>
  );

  const keyExtractor = (item: CommonProjectDetail, index: number) =>
    `${item.emp1Id}-${item.emp2Id}-${item.projectId}-${index}`;

  return (
    <View style={styles.tableContainer}>
      {renderHeader()}
      <FlatList
        data={commonProjects}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <Text style={styles.noDataText}>No common projects found for this pair.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  dataText: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  noDataText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});

export default ProjectTable;
