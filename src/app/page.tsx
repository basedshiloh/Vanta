import CTA from '@/components/homepage-22/CTA';
import Feature from '@/components/homepage-22/Feature';
import FeatureV2 from '@/components/homepage-22/FeatureV2';
import Hero from '@/components/homepage-32/Hero';
import Services from '@/components/homepage-32/Services';
import Services22 from '@/components/homepage-22/Services';
import Steps from '@/components/homepage-22/Steps';
import Testimonial from '@/components/homepage-33/Testimonial';
import FooterThree from '@/components/shared/footer/FooterThree';
import NavbarThree from '@/components/shared/header/NavbarThree';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Vanta Trading Bot',
  description:
    'Vanta Bot - A chat-native, command-based crypto trading bot on Telegram. Execute trades instantly with simple text commands.',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Vanta Trading Bot',
    siteName: 'Vanta Trading Bot',
    description:
      'Vanta Bot - A chat-native, command-based crypto trading bot on Telegram. Execute trades instantly with simple text commands.',
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: 'Vanta Trading Bot',
    description:
      'Vanta Bot - A chat-native, command-based crypto trading bot on Telegram. Execute trades instantly with simple text commands.',
  },
};

const Homepage = () => {
  return (
    <Fragment>
      <NavbarThree btnClassName="btn-secondary hover:btn-primary dark:btn-accent" />
      <main className="bg-white dark:bg-background-7">
        <Hero />
        <Services />
        <Steps />
        <Feature />
        <FeatureV2 />
        <Services22 />
        <Testimonial />
        <CTA />
      </main>
      <FooterThree className="relative border-t border-stroke-1 dark:border-0" />
    </Fragment>
  );
};

export default Homepage;
