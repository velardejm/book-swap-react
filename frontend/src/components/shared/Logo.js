import { LuBookCopy } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <LuBookCopy className="h-full w-14" style={{ color: 'blue' }} />
    </Link>
  );
}
