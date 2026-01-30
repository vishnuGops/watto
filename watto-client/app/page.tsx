import ScrollImageSequence from '@/components/home/ScrollImageSequence';
import LandingInfoOne from '@/components/home/LandingInfoOne';
import LandingStatsInfo from '@/components/home/LandingStatsInfo';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <ScrollImageSequence />
      <LandingStatsInfo />
      <LandingInfoOne />
    </main>
  );
}
