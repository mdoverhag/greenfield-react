import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useIsMobileSize } from "lib/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  container: theme.mixins.gutters({
    padding: theme.spacing(3),
  }),
}));

const GenericContentContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const isMobileSize = useIsMobileSize();
  return (
    <Grid container justify="center">
      {isMobileSize ? (
        <div className={classes.container}>{children}</div>
      ) : (
        <Paper className={classes.container}>{children}</Paper>
      )}
    </Grid>
  );
};

export default GenericContentContainer;
