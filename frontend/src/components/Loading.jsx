import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center z-[999999999] bg-opacity-25 backdrop-blur-sm">
      <Loader2 size={48} className="animate-spin" />
    </div>
  );
};

export default Loading;
