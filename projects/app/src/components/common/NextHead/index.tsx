import Head from 'next/head';
import React from 'react';
import ApplicationPng from '@/pages/app/list/components/application.png';

const NextHead = ({ title, icon, desc }: { title?: string; icon?: string; desc?: string }) => {
  return (
    <Head>
      <title>AI知识库</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no, viewport-fit=cover"
      />
      {desc && <meta name="description" content={desc} />}
      <link rel="icon" href={ApplicationPng.src as any} />
    </Head>
  );
};

export default NextHead;
