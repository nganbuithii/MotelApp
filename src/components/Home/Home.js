import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { COLOR } from '../common/color';
import { HomeIcon, SearchIcon, ChatIcon, NotificationIcon, ProfileIcon } from '../common/Icon'
import HomeIndex from './HomeIndex';
import ChatSc from './ChatSc';
import SearchSc from './SearchSc';
import ProfileSc from './ProfileSc';
import NotificationsSc from './NotificationsSc';
import ProfileDetail from './ProfileDetail';

const Home = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', focusedIcon: HomeIcon, unfocusedIcon: HomeIcon },
        { key: 'search', focusedIcon: SearchIcon, unfocusedIcon: SearchIcon },
        { key: 'chat', focusedIcon: ChatIcon, unfocusedIcon: ChatIcon },
        { key: 'notification', focusedIcon: NotificationIcon, unfocusedIcon: NotificationIcon },
        { key: 'profile', focusedIcon: ProfileIcon, unfocusedIcon: ProfileIcon },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeIndex,
        search: SearchSc,
        chat: ChatSc,
        notification: NotificationsSc,
        profile: ProfileSc,
    });

    return (
        <View style={{ flex: 1 }}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{ backgroundColor: COLOR.color4, height: '8%' }}
                activeColor="black"
                inactiveColor={COLOR.PRIMARY} // Màu trắng cho icon không active
            />

        </View>
    );
};

export default Home;
