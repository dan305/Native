import { View,  StyleSheet, Image, Pressable} from "react-native";
import { colors } from '../global/Colors'
import { LogoImage } from "./Logo";
import { fonts } from '../global/fonts'
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { deleteSession } from "../db";
import StyledText from "../styledComponents/StyledText";

function Header({ title, isLoginPage }) {
    const [fontsLoaded] = useFonts(fonts);
    const { localId, user } = useSelector((state) => state.authReducer.value);
    const dispatch = useDispatch();

    const onLogout = async () => {
        dispatch(logout());
        const deletedSession = await deleteSession({ localId });
    };

    return (
        <View style={styles.menu}>
            <View>
                <Image source={LogoImage} style={styles.logo} />
            </View>
            <View style={[styles.tituloconteiner, isLoginPage ? { marginLeft: 0 } : null]}>
                <StyledText title>{title}</StyledText>
                {user ? (
                    <Pressable style={styles.logoutIcon} onPress={onLogout}>
                        <MaterialIcons name="logout" size={24} color="white" />
                    </Pressable>
                ) : null}
            </View>
        </View>
    )
}


export default Header;

const styles =StyleSheet.create({
    tituloconteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        marginLeft: 120,
    },
    
    logoutIcon: {
        marginLeft: 100,
    },
    logo: {
        marginTop:15,
        width:160,
        height:50,
    },
    menu: {
        alignItems:'center',
        backgroundColor: colors.header
    }
})
