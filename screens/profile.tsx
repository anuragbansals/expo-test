import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Keyboard} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from 'react-query';

import {editDetails} from '../redux/customerSlice';
import {RootState} from '../redux/store';
import Heading from '../molecules/heading';
import CustomButton from '../atoms/button';
import {ColorPalette} from '../constants/colorPalette';

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    gender: '',
    age: 0,
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const {isLoading, isError, data} = useQuery('customer-profile', () => {
    return require('../utils/dummyData/customer.json');
  });

  const profile = useSelector((state: RootState) => state.customer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setProfileDetails({
        name: data.name,
        address: data.address,
        age: data.age,
        gender: data.gender,
      });
    }
  }, [data]);

  const handleEdit = () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      dispatch(
        editDetails({
          address: profileDetails.address,
          age: profileDetails.age,
          gender: profileDetails.gender,
          name: profileDetails.name,
        }),
      );
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (profile.name) {
      setProfileDetails({
        name: profile.name,
        address: profile.address,
        age: profile.age,
        gender: profile.gender,
      });
    }
  }, [profile]);

  if (isLoading) {
    return (
      <View>
        <Text style={styles.text}>...loading</Text>
      </View>
    );
  }

  if (isError) {
    <View>
      <Text style={styles.text}>Something went wrong...</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <Heading heading="Profile" />
      <TextInput
        onChangeText={val => setProfileDetails({...profileDetails, name: val})}
        style={styles.textInput}
        value={profileDetails.name}
        placeholderTextColor={ColorPalette.grey}
        placeholder="Name"
      />
      <TextInput
        onChangeText={val =>
          setProfileDetails({...profileDetails, gender: val})
        }
        style={styles.textInput}
        value={profileDetails.gender}
        placeholderTextColor={ColorPalette.grey}
        placeholder="Gender"
      />
      <TextInput
        onChangeText={val =>
          setProfileDetails({...profileDetails, age: parseInt(val)})
        }
        style={styles.textInput}
        value={profileDetails.age.toString()}
        placeholderTextColor={ColorPalette.grey}
        placeholder="Age"
      />
      <TextInput
        onChangeText={val =>
          setProfileDetails({...profileDetails, address: val})
        }
        style={styles.textInput}
        value={profileDetails.address}
        placeholderTextColor={ColorPalette.grey}
        placeholder="Address"
      />
      <CustomButton
        titleStyle={styles.btnText}
        buttonStyles={styles.btn}
        onPress={handleEdit}
        title={loading ? 'Updating...' : 'Update'}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    padding: 24,
  },
  text: {
    color: ColorPalette.black,
  },
  textInput: {
    color: ColorPalette.black,
    borderColor: ColorPalette.grey,
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  btn: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  btnText: {
    color: ColorPalette.white,
  },
});
