import { authFetcher } from '@/lib/api';
import AdsClient from './AdsClient';

export default async function AdsPage() {
  const ads = await authFetcher('/Advertisement') || [];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Manage <span className="text-nanotek-yellow">Ads</span>
        </h1>
        <p className="text-gray-400 mt-1">Control the dynamic hero carousel on the homepage.</p>
      </div>

      <AdsClient ads={ads} />
    </div>
  );
}
