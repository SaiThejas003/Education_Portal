import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import Logo from './Logo';

export default function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              An autonomous institution accredited by NAAC, committed to excellence in engineering education and research.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-crimson-700">Home</Link></li>
              <li><Link to="/courses" className="text-gray-500 hover:text-crimson-700">Courses</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-crimson-700">Contact</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-crimson-700">Portal Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Portals</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/student/dashboard" className="text-gray-500 hover:text-crimson-700">Student Portal</Link></li>
              <li><Link to="/faculty/dashboard" className="text-gray-500 hover:text-crimson-700">Faculty Portal</Link></li>
              <li><Link to="/admin/dashboard" className="text-gray-500 hover:text-crimson-700">Admin Area</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" />
                <span>KIT Campus, Coimbatore, Tamil Nadu 641001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-crimson-600" />
                <span>+91 422 234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-crimson-600" />
                <span>info@kit.edu.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-crimson-600" />
                <span>www.kit.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-400">
            &copy; 2026 KalaignarKarunanidhi Institute of Technology. All rights reserved. | Education Management Portal v2.4
          </p>
        </div>
      </div>
    </footer>
  );
}
