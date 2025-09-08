import { properties } from '@/lib/data';
import RecommendationsClient from '@/components/RecommendationsClient';

export default function RecommendationsPage() {
  return <RecommendationsClient allProperties={properties} />;
}
