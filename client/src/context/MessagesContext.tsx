import { createContext, useContext, useReducer } from "react";
import messagesReducer, {
  IMessage,
  MessagesActionTypes,
} from "../reducers/messagesReducer";

interface IMessagesContext {
  pushMessage: (message: IMessage) => void;
  hideMessage: () => void;
  currentMessage: IMessage;
}

const MessagesContext = createContext<IMessagesContext | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error(
      "useMessages must be used within a MessagesContextProvider"
    );
  }

  return context;
};

const MessagesContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, {
    currentMessage: null
  });

  return (
    <MessagesContext.Provider
      value={{
        currentMessage: state.currentMessage,
        pushMessage: (payload: IMessage) => {
          console.log("pushMessage: ", payload);
          return dispatch({ type: MessagesActionTypes.PUSH_MESSAGE, payload });
        },
        hideMessage: () => dispatch({ type: MessagesActionTypes.HIDE_MESSAGE }),
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
