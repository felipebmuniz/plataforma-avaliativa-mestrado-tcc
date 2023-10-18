import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ITabs } from '@/types/tabs';

import { useTheme } from '@emotion/react';

interface IProps {
  data: ITabs[];
}

export const TabsUI = ({ data }: IProps) => {
  const theme = useTheme();
  return (
    <Tabs width="100%">
      <TabList>
        {data.map((tab, index) => (
          <Tab
            key={index}
            _selected={{
              color: theme.colorPrimary800,
              borderColor: theme.colorPrimary800,
            }}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
