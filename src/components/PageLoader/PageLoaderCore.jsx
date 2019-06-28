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
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PageLoaderBackdrop from './PageLoaderBackdrop';
import PageLoaderTitleTweener from './PageLoaderTitleTweener';
import Delayed from '../Delayed';
import PageLoaderTitleFinish from './PageLoaderTitleFinish';


const EMPTY = '       ';
const INITIAL_WORD = 'l o a d i n g';
const SHIFT_WORD = 'L O A D I N G';
const FINAL_WORD = 'W E L C O M E';

const INITIAL_DURATION = 2000;
const SHIFT_DURATION = 2000;
const SHIFT_COOLDOWN = 2000;
const FINISH_DURATION = 2000;

const PageLoaderCore = ({ loading, finished }) => {
  const word = useRef(EMPTY);
  const [initial, setInitial] = useState(true);
  const [shift, setShift] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    if (loading && initial && !finished) {
      const timeout = setTimeout(() => {
        setInitial(false);
        setCooldown(true);
      }, INITIAL_DURATION);
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [initial, loading, finished]);

  useEffect(() => {
    if (loading && !(finished || initial || cooldown)) {
      const timeout = setTimeout(() => {
        setShift(!shift);
        setCooldown(true);
      }, SHIFT_DURATION);
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [initial, shift, loading, finished, cooldown]);

  useEffect(() => {
    if (loading && cooldown && !finished) {
      const cd = setTimeout(setCooldown, SHIFT_COOLDOWN, false);

      return () => {
        clearTimeout(cd);
      };
    }
    return () => {};
  }, [loading, finished, cooldown]);

  useEffect(() => {
    if (loading && finished && !finish) {
      setFinish(true);
      const timeout = setTimeout(() => {
        setFinish(false);
      });
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [loading, finished, finish]);

  return (
    <PageLoaderBackdrop>
      <Delayed mounted={!finished && initial} placeholder={null}>
        <PageLoaderTitleTweener
          wordRef={word}
          from={EMPTY}
          to={INITIAL_WORD}
          duration={INITIAL_DURATION}
        />
      </Delayed>
      <Delayed mounted={!finished && !initial && !shift} placeholder={null}>
        <PageLoaderTitleTweener
          wordRef={word}
          from={INITIAL_WORD}
          to={SHIFT_WORD}
          duration={SHIFT_DURATION}
        />
      </Delayed>
      <Delayed mounted={!finished && !initial && shift} placeholder={null}>
        <PageLoaderTitleTweener
          wordRef={word}
          from={SHIFT_WORD}
          to={INITIAL_WORD}
          duration={SHIFT_DURATION}
        />
      </Delayed>
      <Delayed mounted={finish} placeholder={null}>
        <PageLoaderTitleFinish wordRef={word} to={FINAL_WORD} duration={FINISH_DURATION} />
      </Delayed>
    </PageLoaderBackdrop>
  );
};

PageLoaderCore.propTypes = {
  loading: PropTypes.bool,
  finished: PropTypes.bool,
};

PageLoaderCore.defaultProps = {
  loading: false,
  finished: false,
};

export default PageLoaderCore;
