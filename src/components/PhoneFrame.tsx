import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-bg flex items-center justify-center p-4 md:p-8">
      <div className="relative">
        {/* Phone outer frame */}
        <div className="relative w-[390px] h-[800px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
          {/* Inner screen */}
          <div className="relative w-full h-full bg-background rounded-[2.4rem] overflow-hidden flex flex-col">
            {/* Status bar */}
            <div className="flex items-center justify-between px-7 pt-3 pb-1 text-xs font-semibold text-foreground z-20 bg-background">
              <span>9:41</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-6 bg-foreground rounded-full" />
              <div className="flex items-center gap-1">
                <span>●●●</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            {/* App content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4 font-medium">健康管理师 · APP 预览</p>
      </div>
    </div>
  );
};

export default PhoneFrame;