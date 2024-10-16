import { useParams } from '@tanstack/react-router';

export function PublicProfileIndexPage() {
  const { uid } = useParams({ strict: false });
  return (
    <div>{uid}</div>
  );
}
