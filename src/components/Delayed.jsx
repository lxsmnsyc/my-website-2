/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Delays mounting and unmounting for the child components
 *
 * To mount and unmount child components, it is necessary to
 * use the 'mounted' props which serves as a proxy for the mount
 * and unmount states.
 *
 * Users can also provide a placeholder which will be replaced
 * once the component has been mounted or will be added again once
 * the component mounts.
 */
const Delayed = ({
  mounted, mountAfter, unmountAfter, placeholder, children,
}) => {
  const [show, toggle] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(toggle, mounted ? mountAfter : unmountAfter, mounted);

    return () => {
      clearTimeout(timeout);
    };
  }, [mounted, mountAfter, unmountAfter]);

  return show ? <>{children}</> : placeholder;
};
Delayed.propTypes = {
  mounted: PropTypes.bool,
  mountAfter: PropTypes.number,
  unmountAfter: PropTypes.number,
  placeholder: PropTypes.oneOfType([
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
Delayed.defaultProps = {
  mounted: true,
  mountAfter: 0,
  unmountAfter: 0,
  placeholder: <span />,
};

export default Delayed;
