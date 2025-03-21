
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium">
        <span className="text-sm">ED</span>
      </div>
      <span className="font-medium text-base md:text-lg">EnnData</span>
    </Link>
  );
};

export default Logo;
