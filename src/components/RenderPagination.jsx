import React from 'react';
import { Button } from 'antd';

export function renderPagination(_, type, originalElement) {
  if (type === 'prev') {
    return <Button>{'<'}</Button>;
  }
  if (type === 'next') {
    return <Button>{'>'}</Button>;
  }
  return originalElement;
}