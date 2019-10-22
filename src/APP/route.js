import React from "react"
import { Switch, Route } from "react-router-dom"

import Layout from "../components/layout"
import Dashboard from "../Pages/dashboard"
import Home from '../Pages/home'
import Users from "../Pages/users"

function DrewerRouters (props) {
  
  const title = "Dashboard Templete";
  const menuItems = [
    { title: "Dashboard", icon: "dashboard" },
    { title: "Home", icon: "home" },
    { title: "Users", icon: "group" },
  ];

  return (
      <Layout title={title} menuItems={menuItems} logOut={props.logOut}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/home" component={Home} />
          <Route exact path="/dashboard/users" component={Users} />
        </Switch>
      </Layout>
  )
}

export default DrewerRouters ;
