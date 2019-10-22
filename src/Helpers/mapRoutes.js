import React from 'react';
import {Route} from 'react-router-dom';

export default routes => routes.map(route => (
    <Route key={route.name} exact={route.exact} path={route.path} render={(props) => <route.component {...props} /> } />
));