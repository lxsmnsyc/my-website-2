import React from 'react';
import PropTypes from 'prop-types';
import Delayed from '../Delayed';
import PageTransitionOut from './PageTransitionOut';
import PageTransitionIn from './PageTransitionIn';

const PageTransition = ({ mounted }) => (
  <Delayed mounted={mounted} placeholder={<PageTransitionOut />}>
    <PageTransitionIn />
  </Delayed>
);

PageTransition.propTypes = {
  mounted: PropTypes.bool,
};

PageTransition.defaultProps = {
  mounted: false,
};

export default PageTransition;
