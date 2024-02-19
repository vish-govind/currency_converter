import { FlatList, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import CurrencyButton from './Components/CurrencyButton'
import { CurrencyArray } from "./constants"
import Snackbar from 'react-native-snackbar'

//Scroll View is not very performance optimized when compared to Flat List.
//Flatlist doesn't create the whole list in one go . 
//It just creates the view whatever we see on screen and as we scroll the data loads . Consumes less memory and performance optimized
export default function App() : JSX.Element{
  const[inputValue , setInputValue] = useState('')
  const[resultValue , setResultValue] = useState('')
  const[targetCurrency , settargetCurrency] = useState('')

  const buttonPressed = (selectedCurrency : Currency) => {
    if(!inputValue){
      return Snackbar.show(
        {
          text: "Enter a input value to convert",
          backgroundColor: "#EA7773",
          textColor: "#000000"
        }
      )
    }
    const inputamount = parseFloat(inputValue)
    if(!isNaN(inputamount)){
      const convertedValue = inputamount * selectedCurrency.value
      const result = `${selectedCurrency.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      settargetCurrency(selectedCurrency.name)
    }
    else 
    {
      return Snackbar.show(
        {
          text: "Not a valid number",
          backgroundColor: "#EA7773",
          textColor: "#000000"
        }
      )
    }
  }

  return (
   <>
   <StatusBar/>
   <View style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.rupeesContainer}>
      <Text style={styles.rupee}>₹</Text>
      <TextInput 
      maxLength={14}
      value={inputValue}
      onChangeText={setInputValue}
      keyboardType='number-pad'
      placeholder='Enter amount in Rupees'/>
      </View>
      {resultValue && (
        <Text style={styles.resultTxt}>
          {resultValue}
        </Text>
      )}
    </View>
    <View style={styles.bottomContainer}>
        <FlatList
         numColumns={3}
         data={CurrencyArray}
         keyExtractor={item => item.name}
         renderItem={({item}) => (
          <Pressable style={[styles.button, targetCurrency === item.name && styles.selected]}
          onPress={() => buttonPressed(item)}>
            <CurrencyButton {...item}/>
          </Pressable>
         )}
         />
    </View>
   </View>
   </>
  )
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#515151',
  },
topContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-evenly',
},
rupeesContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
resultTxt: {
  fontSize: 32,
  color: '#000000',
  fontWeight: '800',
},
rupee: {
  marginRight: 8,

  fontSize: 22,
  color: '#000000',
  fontWeight: '800',
},
inputAmountField: {
  height: 40,
  width: 200,
  padding: 8,
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: '#FFFFFF',
},
bottomContainer: {
  flex: 3,
},
button: {
  flex: 1,

  margin: 12,
  height: 60,

  borderRadius: 12,
  backgroundColor: '#fff',
  elevation: 2,
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowColor: '#333',
  shadowOpacity: 0.1,
  shadowRadius: 1,
},
selected: {
  backgroundColor: '#ffeaa7',
},})