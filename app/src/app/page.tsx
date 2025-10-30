// src/app/page.tsx
import Generator from '@/components/Generator';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">CryptoPunks Generator</h1>
      <Generator />
    </main>
  );
}
