import { createContext } from 'react';
import { IMessage } from '../reducers/messagesReducer';

interface IMessagesContext {
    pushMessage: (message: IMessage) => void
    currentMessage: IMessage
}

const MessagesContext = createContext<Partial<IMessagesContext>>({});

export default MessagesContext