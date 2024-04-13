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


const Home = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: HomeIcon, unfocusedIcon: HomeIcon },
        { key: 'search', title: 'Tìm kiếm', focusedIcon: SearchIcon, unfocusedIcon: SearchIcon },
        { key: 'chat', title: 'Chat', focusedIcon: ChatIcon, unfocusedIcon: ChatIcon },
        { key: 'notification', title: 'Thông báo', focusedIcon: NotificationIcon, unfocusedIcon: NotificationIcon },
        { key: 'profile', title: 'Profile', focusedIcon: ProfileIcon, unfocusedIcon: ProfileIcon },
]); 

const renderScene = BottomNavigation.SceneMap({
        home: HomeIndex,
        search: SearchSc,
        chat: ChatSc,
        notification: NotificationsSc,
        profile:ProfileSc
    });

    return (
        <View style={{ flex: 1 }}>
        
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{ backgroundColor: COLOR.color8 }}
                activeColor="white" 
            />
    </View>
    
    );
};

export default Home;
