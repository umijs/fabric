import type { ConnectProps, ConnectState, UserModelState } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import { getRouteAuthority } from '@/utils/utils';
import { connect } from 'dva';
import React from 'react';
import { Redirect } from 'umi';

type AuthComponentProps = {
  user: UserModelState;
} & ConnectProps;

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
