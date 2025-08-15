import DecryptedText from "@/components/bits/DecryptedText";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <DecryptedText 
        text="South Outer Space" 
        className="font-mono uppercase font-medium"
        encryptedClassName="font-mono font-medium text-gray-400"
        animateOn="view"
        sequential={true}
        speed={80}
        revealDirection="center"
        parentClassName="cursor-pointer transition-transform duration-300"
      />
    </div>
  );
}
