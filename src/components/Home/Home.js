import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Mucsic from './Mucsic';

const AlbumsRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Albums</Text>
        <Feather name="users" size={24} color="black" />

    </View>
    );
const Icon1=() => (
    <Feather name="users" size={24} color="black" />
)
const Icon2=() => (
    <Fontisto name="hipchat" size={24} color="black" />
)
const IconChat = () => (
    <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
)
const IconChat2 = () => (
    <Ionicons name="chatbubble-ellipses-sharp" size={24} color="black" />
)

const RecentsRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recents</Text>
    </View>
    );

const NotificationsRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications</Text>
    </View>
    );

const Home = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'HOME', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
        { key: 'search', title: 'Tìm kiếm', focusedIcon: 'magnify' },
        { key: 'chat', title: 'Chat', focusedIcon: IconChat2, unfocusedIcon: IconChat },
        { key: 'notification', title: 'Thông báo', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
        { key: 'profile', title: 'Profile',focusedIcon: Icon1, unfocusedIcon: Icon1 },
]); 

const renderScene = BottomNavigation.SceneMap({
        home: Mucsic,
        search: AlbumsRoute,
        chat: RecentsRoute,
        notification: NotificationsRoute,
        profile:NotificationsRoute
        
    });

    return (
        <View style={{ flex: 1 }}>
            <Text>Hello</Text>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
    </View>
    
    );
};

export default Home;
