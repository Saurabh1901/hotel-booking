import React from 'react'
import { ImageBackground, StyleSheet, Text, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
const BookingScreen = ({navigation, route}) => {
	const item = route.params;
	console.log(item)
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				backgroundColor: 'white',
				flex: 1,
				paddingTop: 40,
				paddingBottom: 20
			}}
		>
			<Text>Hello</Text>
			<ImageBackground 
				style={styles.headerImage}
				
			>
			</ImageBackground>
		</ScrollView>
	)
}

export default BookingScreen

const styles = StyleSheet.create({
	headerImage:{
		height: 400,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		overflow: 'hidden',
	}
})
