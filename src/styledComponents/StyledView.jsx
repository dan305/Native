import { StyleSheet, View } from "react-native";
import { colors } from '../global/Colors'

const styles = StyleSheet.create({
    general: {
        padding: 10,
    },
    itemCart:{
        margin:10,
        flex:1,
        height:100,
        backgroundColor: colors.header,
        padding: 10,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    card:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },
    loadingContainer: {
        marginTop: 200,
      },
      marginVertical:{
        marginVertical: 20 
      },
      row :{
        flexDirection: 'row'
      },
      marginBottom:{
        marginBottom:20,
      },
      flex:{
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
      }
})

export default function StyledView({children, itemCart, loadingContainer,card,marginVertical,row,marginBottom,flex,...props}) {
    const viewStyles = [
        styles.general,
        itemCart && styles.itemCart,
        loadingContainer && styles.loadingContainer,
        card && styles.card,
        marginVertical && styles.marginVertical,
        row && styles.row,
        marginBottom && styles.marginBottom,
        flex && styles.flex
    ];
    return <View style={[viewStyles, { ...props }]}>{children}</View>
}
