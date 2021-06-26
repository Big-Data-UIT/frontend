import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      padding: '1rem 0rem'
    },
  },
}));

interface Props {
  total: number,
  page: number,
  onClickPageChange: Function
}

export default function PaginationComponent(props: Props) {
  const classes = useStyles();
  const { total,page,onClickPageChange} = props;
  const handleChange = (event: any,value:any) => {
    onClickPageChange(value);
  }
  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Pagination count={total} page={page} onChange={handleChange} color="primary" />
      </ThemeProvider>
    </div>
  );
}