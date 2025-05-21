import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { FAB, Card, Title, Paragraph, Button, TextInput, Dialog, Portal } from 'react-native-paper';
import MessageService from '../services/MessageService';
import { appStyles } from '../styles';

const MessageList = ({ route, navigation }) => {
  const { directory } = route.params;
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadMessages();
  }, [directory]);

  const loadMessages = async () => {
    const msgs = await MessageService.getAll(directory.id);
    setMessages(msgs);
  };

  const handleCreate = async () => {
    if (text.trim()) {
      await MessageService.create(directory.id, text);
      setText('');
      setVisible(false);
      loadMessages();
    }
  };

  const handleUpdate = async () => {
    if (text.trim() && editingId) {
      await MessageService.update(directory.id, editingId, text);
      setText('');
      setEditingId(null);
      setEditVisible(false);
      loadMessages();
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await MessageService.delete(directory.id, deleteId);
      setDeleteId(null);
      setDeleteVisible(false);
      loadMessages();
    }
  };

  const openEditDialog = (message) => {
    setText(message.text);
    setEditingId(message.id);
    setEditVisible(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteVisible(true);
  };

  return (
    <View style={appStyles.container}>
      <ScrollView>
        {messages.map(message => (
          <Card key={message.id} style={appStyles.card}>
            <Card.Content>
              <Paragraph>{message.text}</Paragraph>
              <Paragraph>
                Created: {new Date(message.createdAt).toLocaleString()}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => openEditDialog(message)}>
                Edit
              </Button>
              <Button onPress={() => openDeleteDialog(message.id)}>
                Delete
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <FAB
        style={appStyles.fab}
        icon="plus"
        onPress={() => setVisible(true)}
      />

      {/* Create Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Create New Message</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Message Text"
              value={text}
              onChangeText={setText}
              style={appStyles.input}
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={handleCreate}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Edit Dialog */}
      <Portal>
        <Dialog visible={editVisible} onDismiss={() => setEditVisible(false)}>
          <Dialog.Title>Edit Message</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Message Text"
              value={text}
              onChangeText={setText}
              style={appStyles.input}
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditVisible(false)}>Cancel</Button>
            <Button onPress={handleUpdate}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Delete Dialog */}
      <Portal>
        <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this message?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteVisible(false)}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MessageList;