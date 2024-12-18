import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({bgColor = '#19918F', text, onPress = () => {} }) {
    return(
        <TouchableOpacity
      onPress={onPress}
      style={{ ...style.button, backgroundColor: bgColor }}
    >
      <Text style={style.buttonText}>{text}</Text>
    </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
    
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})

export default Button;