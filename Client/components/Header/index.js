import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
const Header = () => {
    const signOutUser = () => {

    }
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Hotel Booking</Text>
            {/* <Image style={styles.logo} source={require('../../assets/images/logo.png')} /> */}
            {/* <Image style={styles.menu} source={require('../../assets/images/menu.png')} /> */}
            <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded />
                    </TouchableOpacity>
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        zIndex: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20
    },
    logo: {
        fontSize: 25,
        fontWeight: 'bold',
        // width: 100,
        // height: 20,
        resizeMode: 'contain'
    },
    menu: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
});
export default Header;