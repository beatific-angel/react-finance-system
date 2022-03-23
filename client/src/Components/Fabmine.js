import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles(theme => ({
  root: {
        position: 'fixed',
        width: '50px',
        height: '50px',
        bottom: '30px',
        left: '50px',
        'z-index': 100,
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

export default function Fabmine() {
  const classes = useStyles();
  const [whatsapp, setWhatsapp] = useState('');
  useEffect(() => {
        fetch('/basic', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    const {
                        whatsapp = '',
                    } = res.info;
                    setWhatsapp(whatsapp);
                }

            })
    }, []);

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" size="width:50px" href={whatsapp}>
        <WhatsAppIcon />
      </Fab>
    </div>
  );
}