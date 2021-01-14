import { useReducer } from 'react'

interface MessagesState {
    currentMessage: {
        type: 'success' | 'error'
        text: string
    } | null
}

export type IMessage = MessagesState['currentMessage']

enum MessagesActionTypes {
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
            return { ...state, currentMessage: action.payload as IMessage }
        case MessagesActionTypes.HIDE_MESSAGE:
            return { ...state, currentMessage: null }
        default:
            return state
    }
}

export const useMessage = () => {
    const [state, dispatch] = useReducer(messagesReducer, initialState)

    return {
        currentMessage: state.currentMessage,
        pushMessage: (payload: MessagesState['currentMessage']) => {
            console.log('pushMessage: ', payload)
            setTimeout(() => {
                dispatch({
                    type: MessagesActionTypes.HIDE_MESSAGE,
                })
            }, 4500)

            return dispatch({
                type: MessagesActionTypes.PUSH_MESSAGE,
                payload
            })
        }
    }
}

export default messagesReducer