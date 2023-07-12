import { View, Text } from "react-native";

import ComparoName from "../components/ComparoName";

function ListScreen ({firstItem, secondItem})
{
    return (
        <View>
            <ComparoName
            firstItem={firstItem}
            secondItem={secondItem}
            />

        </View>
    );
}

export default ListScreen;