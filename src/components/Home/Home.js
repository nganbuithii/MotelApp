import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { COLOR } from '../common/color';
import { HomeIcon, SearchIcon, ChatIcon, NotificationIcon, ProfileIcon, PlusIcon } from '../common/Icon'
import HomeIndex from './HomeIndex';
import ChatSc from './ChatSc';
import SearchSc from './SearchSc';
import ProfileSc from './ProfileSc';
import NotificationsSc from './NotificationsSc';
import MyContext from '../../configs/MyContext';
import SearchStack from './SearchStack';
import PlusOwner from '../OwnerMotel/PlusOwner';


const Home = () => {
    const [index, setIndex] = React.useState(0);
    const [user, dispatch] = React.useContext(MyContext);
    const [routesDefault] = React.useState([
        { key: 'home', focusedIcon: HomeIcon, unfocusedIcon: HomeIcon },
        { key: 'search', focusedIcon: SearchIcon, unfocusedIcon: SearchIcon },
        { key: 'chat', focusedIcon: ChatIcon, unfocusedIcon: ChatIcon },
        { key: 'notification', focusedIcon: NotificationIcon, unfocusedIcon: NotificationIcon },
        { key: 'profile', focusedIcon: ProfileIcon, unfocusedIcon: ProfileIcon },
    ]);

    const [routesOwner] = React.useState([
        { key: 'home', focusedIcon: HomeIcon, unfocusedIcon: HomeIcon },
        { key: 'chat', focusedIcon: ChatIcon, unfocusedIcon: ChatIcon },
        { key: 'plus', focusedIcon: PlusIcon, unfocusedIcon: PlusIcon },
        { key: 'notification', focusedIcon: NotificationIcon, unfocusedIcon: NotificationIcon },
        { key: 'profile', focusedIcon: ProfileIcon, unfocusedIcon: ProfileIcon },
    ]);
    const routes = user.user_role === 'MOTEL_OWNER' ? routesOwner : routesDefault;

    const renderScene = BottomNavigation.SceneMap({
        home: HomeIndex,
        search: SearchStack, 
        chat: ChatSc,
        notification: NotificationsSc,
        profile: ProfileSc,
        plus:PlusOwner
    });

    return (
        <View style={{ flex: 1 }}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{ backgroundColor: COLOR.color12, height: '7%' }}
                activeColor={COLOR.finally}
                inactiveColor="#fff" // Màu trắng cho icon không active
            />

        </View>
    );
};

export default Home;
