import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

interface AppScrollViewProps extends ScrollViewProps {
    showsVerticalScrollIndicator?: boolean;
}

const AppScrollView: React.FC<AppScrollViewProps> = ({
    showsVerticalScrollIndicator = false,
    ...rest
}) => {
    return <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        {...rest} />;
};

export default AppScrollView;