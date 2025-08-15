import DecryptedText from '@/components/bits/DecryptedText';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <DecryptedText
        animateOn="view"
        className="font-medium font-mono uppercase"
        encryptedClassName="font-mono font-medium text-gray-400"
        parentClassName="cursor-pointer transition-transform duration-300"
        revealDirection="center"
        sequential={true}
        speed={80}
        text="South Outer Space"
      />
    </div>
  );
}
