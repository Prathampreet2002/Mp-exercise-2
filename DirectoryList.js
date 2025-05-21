import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native';
import { 
  FAB, 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  TextInput, 
  Dialog, 
  Portal, 
  Searchbar,
  useTheme
} from 'react-native-paper';
import DirectoryService from '../services/DirectoryService';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, appStyles } from '../styles';

const DirectoryList = ({ navigation }) => {
  const [directories, setDirectories] = useState([]);
  const [filteredDirectories, setFilteredDirectories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [numColumns, setNumColumns] = useState(2);
  const { colors } = useTheme();

  // Calculate responsive layout
  const calculateColumns = () => {
    const { width } = Dimensions.get('window');
    return width > 600 ? 3 : 2;
  };

  useEffect(() => {
    loadDirectories();
    const updateColumns = () => setNumColumns(calculateColumns());
    
    Dimensions.addEventListener('change', updateColumns);
    return () => Dimensions.removeEventListener('change', updateColumns);
  }, []);

  useEffect(() => {
    filterDirectories();
  }, [directories, searchQuery]);

  const loadDirectories = async () => {
    const dirs = await DirectoryService.getAll();
    setDirectories(dirs);
  };

  const filterDirectories = () => {
    if (!searchQuery) {
      setFilteredDirectories([...directories]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const result = directories.filter(dir => 
      dir.name.toLowerCase().includes(query)
    );
    
    setFilteredDirectories(result);
  };

  const handleCreate = async () => {
    if (name.trim()) {
      await DirectoryService.create(name);
      setName('');
      setVisible(false);
      loadDirectories();
    }
  };

  const handleUpdate = async () => {
    if (name.trim() && editingId) {
      await DirectoryService.update(editingId, { name });
      setName('');
      setEditingId(null);
      setEditVisible(false);
      loadDirectories();
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await DirectoryService.delete(deleteId);
      setDeleteId(null);
      setDeleteVisible(false);
      loadDirectories();
    }
  };

  const openEditDialog = (directory) => {
    setName(directory.name);
    setEditingId(directory.id);
    setEditVisible(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteVisible(true);
  };

  const renderDirectoryItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Messages', { directory: item })}
      style={styles.itemContainer}
      activeOpacity={0.9}
    >
      <Card style={styles.card}>
        <LinearGradient
          colors={[theme.colors.cardGradientStart, theme.colors.cardGradientEnd]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Button 
                icon="folder" 
                mode="contained" 
                color="white"
                style={styles.folderButton}
                compact
              />
            </View>
            <Title style={styles.title} numberOfLines={1}>{item.name}</Title>
            <Paragraph style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Paragraph>
          </Card.Content>
        </LinearGradient>
        <Card.Actions style={styles.actions}>
          <Button 
            onPress={(e) => {
              e.stopPropagation();
              openEditDialog(item);
            }}
            icon="pencil"
            compact
            textColor={colors.primary}
            style={styles.actionButton}
          >
          </Button>
          <Button 
            onPress={(e) => {
              e.stopPropagation();
              openDeleteDialog(item.id);
            }}
            icon="delete"
            compact
            textColor={colors.error}
            style={styles.actionButton}
          >
          </Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={appStyles.container}>
      <Searchbar
        placeholder="Search directories"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={appStyles.searchbar}
        iconColor={colors.primary}
        inputStyle={{ color: colors.text }}
      />

      <FlatList
        data={filteredDirectories}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        key={numColumns} // Force re-render when columns change
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Button 
              icon="folder-open"
              mode="outlined"
              style={styles.emptyIcon}
              color={colors.disabled}
            >
              No directories found
            </Button>
          </View>
        }
      />

      <FAB
        style={appStyles.fab}
        icon="plus"
        onPress={() => setVisible(true)}
        color="white"
      />

      {/* Create Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title style={{ color: colors.primary }}>
            Create New Directory
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Directory Name"
              value={name}
              onChangeText={setName}
              style={appStyles.input}
              underlineColor={colors.primary}
              activeUnderlineColor={colors.primary}
              textColor={colors.text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setVisible(false)}
              textColor={colors.text}
            >
              Cancel
            </Button>
            <Button 
              onPress={handleCreate}
              textColor={colors.primary}
            >
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Edit Dialog */}
      <Portal>
        <Dialog visible={editVisible} onDismiss={() => setEditVisible(false)}>
          <Dialog.Title style={{ color: colors.primary }}>
            Edit Directory
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Directory Name"
              value={name}
              onChangeText={setName}
              style={appStyles.input}
              underlineColor={colors.primary}
              activeUnderlineColor={colors.primary}
              textColor={colors.text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setEditVisible(false)}
              textColor={colors.text}
            >
              Cancel
            </Button>
            <Button 
              onPress={handleUpdate}
              textColor={colors.primary}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Delete Dialog */}
      <Portal>
        <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
          <Dialog.Title style={{ color: colors.error }}>
            Confirm Delete
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this directory?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setDeleteVisible(false)}
              textColor={colors.text}
            >
              Cancel
            </Button>
            <Button 
              onPress={handleDelete}
              textColor={colors.error}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    maxWidth: '50%', // Default for 2 columns
    padding: 8,
  },
  card: {
    flex: 1,
    borderRadius: theme.roundness,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 12,
  },
  folderButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  actions: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    borderColor: theme.colors.disabled,
  },
  // Responsive styles
  '@media (min-width: 600)': {
    itemContainer: {
      maxWidth: '33.33%', // For 3 columns on larger screens
    },
  },
});

export default DirectoryList;