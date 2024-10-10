import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../utils';

const MyRadio = ({ label, value, options, onValueChange }) => {
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: fonts.primary[600], color: colors.primary, marginBottom: 5, fontSize:15}}>{label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {options.map(option => (
                    <TouchableOpacity
                        key={option.value}
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                        onPress={() => onValueChange(option.value)}
                    >
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                            marginTop:10
                        }}>
                            {value === option.value && (
                                <View style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: colors.primary,
                                }} />
                            )}
                        </View>
                        <Text style={{ fontFamily: fonts.primary[500], color: colors.black }}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default MyRadio;
