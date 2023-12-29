import Button from './Button';

import { Link } from 'react-router-dom';
import { LuBookCopy } from 'react-icons/lu';

export default function Header() {
  return (
    <div className="flex justify-between items-center h-24 px-2">
      <a href="#">
        <LuBookCopy className="h-full w-14" style={{ color: 'blue' }} />
      </a>
      <div>
        <Button label={'Log in'} className={'btn btn-primary mx-2'} />
        <Link to="/signup">
          <Button label={'Sign up'} className={'btn btn-primary'} />
        </Link>
      </div>
    </div>
  );
}
