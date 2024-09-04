import React, { useEffect, useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { iconPaths } from './constants';

const MyIcon = ({
  name,
  width = 'auto',
  height = 'auto'
}: {
  name: string;
  width: string;
  height: string;
}) => {
  iconPaths[name];

  return !!IconComponent ? (
    <Icon
      {...IconComponent}
      w={w}
      h={h}
      boxSizing={'content-box'}
      verticalAlign={'top'}
      fill={'currentcolor'}
      {...props}
    />
  ) : (
    <Box w={w} h={'1px'}></Box>
  );
};

export default React.memo(MyIcon);
