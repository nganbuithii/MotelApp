import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLOR } from './color';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export const HomeIcon = () => <Ionicons name="home" size={24} color={COLOR.text_weak_color} />;
export const SearchIcon = () => <FontAwesome name="search" size={24} color={COLOR.text_weak_color} />;
export const ChatIcon = () => <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLOR.text_weak_color} />;
export const NotificationIcon = () => <FontAwesome5 name="bell" size={24} color={COLOR.text_weak_color} />;
export const ProfileIcon = () => <Feather name="user" size={24} color={COLOR.text_weak_color} />;
export const icnext = () => <AntDesign name="caretright" size={24} color="black" />
