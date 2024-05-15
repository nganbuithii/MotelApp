import { createStackNavigator } from '@react-navigation/stack';
import MapSearch from '../common/MapSearch';
import SearchSc from './SearchSc';

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchSc" component={SearchSc} options={{ headerShown: false }} />
            <Stack.Screen name="MapSearch" component={MapSearch} options={{ headerTitle: 'Tìm kiếm' }} />
            
        </Stack.Navigator>
    );
};

export default SearchStack;
