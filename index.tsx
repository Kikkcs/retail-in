import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

console.log(' INDEX FILE LOADED');

export default function BillingScreen() {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const createInvoice = async () => {
  console.log('Function entered');

  try {
    console.log('Button clicked');
    console.log('Item:', itemId, 'Qty:', quantity);

    alert('Before Firestore');

    const stockRef = doc(db, 'stock', itemId);
    const stockSnap = await getDoc(stockRef);
    console.log(' DB OBJECT:', db);

   console.log(' After getDoc');

    console.log('Stock exists:', stockSnap.exists());

    if (!stockSnap.exists()) {
      alert('Stock not found');
      return;
    }

    const currentQty = stockSnap.data().quantity;
    console.log('Current qty:', currentQty);

    await updateDoc(stockRef, {
      quantity: currentQty - Number(quantity),
    });

    await addDoc(collection(db, 'invoices'), {
      itemId,
      quantity: Number(quantity),
      createdAt: new Date(),
    });

    alert(' Invoice created');
  } catch (e: any) {
    console.error(' CAUGHT ERROR:', e);
    alert(' ERROR: ' + e?.message);
  }
};




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Invoice</Text>

      <TextInput
  placeholder="Item ID (eg: rice)"
  placeholderTextColor="#aaa"
  style={styles.input}
  value={itemId}
  onChangeText={setItemId}
/>

<TextInput
  placeholder="Quantity"
  placeholderTextColor="#aaa"
  keyboardType="numeric"
  style={styles.input}
  value={quantity}
  onChangeText={setQuantity}
/>


      <Button title="Generate Invoice" onPress={createInvoice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',   // dark background
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',               // visible text
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',               // input text color FIX
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
});

