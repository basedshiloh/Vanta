import vantaDarkLogo from '@public/images/shared/vanta-dark-mode.svg';
import vantaDarkLogoMobile from '@public/images/shared/vanta-dark-logo.svg';
import vantaLightLogo from '@public/images/shared/vanta-light-mode.svg';
import vantaLightLogoMobile from '@public/images/shared/vanta-light-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <span className="sr-only">Home</span>
        <figure className="hidden lg:block lg:max-w-[198px]">
          <Image src={vantaLightLogo} alt="Vanta Trading Bot" className="block dark:hidden" />
          <Image src={vantaDarkLogo} alt="Vanta Trading Bot" className="hidden dark:block" />
        </figure>

        {/* mobile logo */}
        <figure className="block size-11 lg:hidden">
          <Image src={vantaLightLogoMobile} alt="Vanta Trading Bot" className="block w-full dark:hidden" />
          <Image src={vantaDarkLogoMobile} alt="Vanta Trading Bot" className="hidden w-full dark:block" />
        </figure>
      </Link>
    </div>
  );
};

export default Logo;
