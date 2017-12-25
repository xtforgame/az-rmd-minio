// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import LocaleDropdown from '~/containers/LocaleDropdown'

import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  logout,
} from '../App/actions';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import formatMessage from '~/utils/formatMessage';
import { push } from 'react-router-redux';
import { messages } from '../App/translation';

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class MainAppBar extends React.Component {
  render(){
    const { logout, classes, intl, onToggleMenu = () => {} } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.menuButton} onTouchTap={onToggleMenu} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              <FormattedMessage {...messages.appTitle} />
            </Typography>
            <LocaleDropdown />
            <Button color="contrast" onTouchTap={logout}>
              <FormattedMessage {...messages.logout} />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default compose(
  connect(
    state => ({}),
    { logout, push }
  ),
  injectIntl,
  withStyles(styles),
)(MainAppBar);
