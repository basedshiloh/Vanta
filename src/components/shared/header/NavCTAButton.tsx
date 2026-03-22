import LinkButton from '@/components/ui/button/LinkButton';
import { cn } from '@/utils/cn';
import { AnchorHTMLAttributes } from 'react';

interface NavCTAButtonProps
  extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  btnClassName?: string;
  href: string;
  label: string;
  className?: string;
}

const NavCTAButton = ({
  btnClassName,
  href = '/',
  label,
  className,
  target,
  rel,
}: NavCTAButtonProps) => {
  return (
    <div className={cn('hidden items-center justify-center xl:flex', className)}>
      <LinkButton href={href} className={cn('btn btn-md', btnClassName)} target={target} rel={rel}>
        {label}
      </LinkButton>
    </div>
  );
};

export default NavCTAButton;
