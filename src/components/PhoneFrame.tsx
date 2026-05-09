import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {children}
    </div>
  );
};

export default PhoneFrame;