import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { COLOR } from '../common/color';
import { HomeIcon, SearchIcon, ChatIcon, NotificationIcon, ProfileIcon } from '../common/Icon'

import Mucsic from './Mucsic';

const AlbumsRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Albums</Text>
    

    </View>
    );


const SearchRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recents</Text>
    </View>
    );
const ChatRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recents</Text>
    </View>
    );

const NotificationsRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications</Text>
    </View>
    );
const ProfileRole  = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications</Text>
    </View>
    );

const Home = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: HomeIcon, unfocusedIcon: HomeIcon },
        { key: 'search', title: 'Tìm kiếm', focusedIcon: SearchIcon, unfocusedIcon: SearchIcon },
        { key: 'chat', title: 'Chat', focusedIcon: ChatIcon, unfocusedIcon: ChatIcon },
        { key: 'notification', title: 'Thông báo', focusedIcon: NotificationIcon, unfocusedIcon: NotificationIcon },
        { key: 'profile', title: 'Profile', focusedIcon: ProfileIcon, unfocusedIcon: ProfileIcon },
]); 
// const customTabStyle = ({ focused }) => {
//     return {
//         backgroundColor: focused ? COLOR.color11 : 'transparent', // Tùy chỉnh màu nền khi icon được chọn
//     };
// };
const renderScene = BottomNavigation.SceneMap({
        home: Mucsic,
        search: SearchRoute,
        chat: ChatRoute,
        notification: NotificationsRoute,
        profile:ProfileRole
    });

    return (
        <View style={{ flex: 1 }}>
            <Text>Hello</Text>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{ backgroundColor: COLOR.color8 }}
                // tabStyle={customTabStyle}
                activeColor="white" 
                labelStyle={{ fontSize: 20 }} // Đặt kích thước font chữ
            />
    </View>
    
    );
};

export default Home;
