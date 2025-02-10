import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Core from "../Components/Core";

export interface IContactProps {}

const Contact = () => {
    return (
        <Core>
            <View>
                <Text style={style.header}>Skontaktuj się z nami</Text>
                <Text style={style.text}>Tel: 213 769 420</Text>
                <Text style={style.text}>Email: kontant@otoszroto.pl</Text>
                <Text style={style.text}>Adres: ul. Księżycowa 12, 12-345 Warszawa</Text>
                </View>

        </Core>
    )
}

const style = StyleSheet.create({
    main: {

    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,

    },
    text: {
        fontSize: 18,
        color: "black",
        marginBottom: 5,
    }
})

export default Contact;