import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const Loading = ({ active, children, loader: Loader, disabled }) => {
  const renderedRef = useRef(false);

  useEffect(() => {
    renderedRef.current = true;
  }, []);

  const renderChildren = useCallback(
    () => (typeof children === 'function' ? children() : children),
    [children]
  );

  return RUNTIME_ENV === 'server' ||
    disabled ||
    (renderedRef.current && !active) ? (
    renderChildren()
  ) : (
    <Loader />
  );
};

Loading.propTypes = {
  disabled: PropTypes.bool,
  loader: PropTypes.elementType,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  active: PropTypes.bool,
};

Loading.defaultProps = {
  disabled: false,
  active: false,
  loader: () => '...Loading',
};

export default Loading;
