import { TouchableOpacity, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../constants';
import { OrdersTile } from '../components';
import styles1 from './cart.style';



const Health = ({navigation}) => {

  return (
   <SafeAreaView style={styles1.container}>
      <View style={styles1.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles1.titletxt}>Theo dõi sức khỏe</Text>
      </View>
   
   </SafeAreaView>
  )
}

export default Health

