interface MessagesState {
    currentMessage: {
        type: 'success' | 'error'
        text: string
    } | null
}

export type IMessage = MessagesState['currentMessage']

export enum MessagesActionTypes {
    PUSH_MESSAGE = 'MESSAGES/PUSH_MESSAGE',
    HIDE_MESSAGE = 'MESSAGES/HIDE_MESSAGE'
}

interface IMessagesAction {
    type: MessagesActionTypes
    payload?: MessagesState['currentMessage']
}

const initialState: MessagesState = {
    currentMessage: null
}

const messagesReducer = (state = initialState, action: IMessagesAction) => {
    switch (action.type) {
        case MessagesActionTypes.PUSH_MESSAGE:
            console.log('i am a reducer', action.payload)
            return { ...state, currentMessage: action.payload as IMessage }
        case MessagesActionTypes.HIDE_MESSAGE:
            return { ...state, currentMessage: null }
        default:
            return state
    }
}

export default messagesReducer