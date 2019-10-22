import React, { Fragment, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Copyright from "../components/copyright";
import CustomTable from "../components/customTable";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4)
  }
}));

export default function Users(props) {
  const classes = useStyles();
  const [tableData] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
      }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ]
  });

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <CustomTable
          title="Users"
          columns={tableData.columns}
          data={tableData.data}
        />
      </Container>
      <Copyright />
    </Fragment>
  );
}
