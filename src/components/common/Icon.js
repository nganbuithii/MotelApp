import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLOR } from './color';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export const HomeIcon = ({ color }) => <Ionicons name="home" size={24} color={color} />;
export const SearchIcon = ({ color }) => <FontAwesome name="search" size={24} color={color} />;
export const ChatIcon = ({ color }) => <MaterialCommunityIcons name="chat-processing" size={24} color={color} />
export const NotificationIcon = ({ color }) => <FontAwesome5 name="bell" size={24} color={color} />;
export const ProfileIcon = ({ color }) => <Feather name="user" size={24} color={color} />;
export const PlusIcon = ({ color }) => <AntDesign name="plussquareo" size={24} color={color} />

export const icnext = () => <AntDesign name="caretright" size={24} color="black" />
