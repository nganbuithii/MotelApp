import * as React from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';

const DialogTitle = ({title}) => {
    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Text variant="bodyMedium">{title}</Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default DialogTitle;