import { Herosection, FeaturesSection, HowItWorksSection, Footer, CalltoAction } from '../../components';

const PublicLandingPage = () => {
  return (
    <div className='m-2 mx-auto '>
      {/* <Header /> */}
      <Herosection />
      <FeaturesSection />
      <HowItWorksSection />
      <CalltoAction />
      <Footer />
    </div>
  );
};

export default PublicLandingPage;