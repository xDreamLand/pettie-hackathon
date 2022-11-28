import { User } from '../firebase';
import React from 'react';

export interface Family {
  id: string;
  participants: string[];
}

export const initialCounterState = {
  user: {} as User,
  family: {} as Family,
};

const mainContextWrapper = (component?: React.Component) => ({
  ...initialCounterState,
  setUser: (user: User) => {
    initialCounterState.user = user;
    component?.setState({ context: mainContextWrapper(component) });
  },
  setFamily: (family: Family) => {
    initialCounterState.family = family;
    component?.setState({ context: mainContextWrapper(component) });
  },
});

type Context = ReturnType<typeof mainContextWrapper>;

export const MainContext = React.createContext<Context>(mainContextWrapper());

interface State {
  context: Context;
}

export class MainContextProvider extends React.Component {
  state: State = {
    context: mainContextWrapper(this),
  };

  render() {
    return (
      <MainContext.Provider value={this.state.context}>{this.props.children}</MainContext.Provider>
    );
  }
}
