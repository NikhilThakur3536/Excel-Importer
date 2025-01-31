import { FileUpload } from './components/FileUPload';
import ProgressBar from './components/ProgressBar';
import './index.css';

export default function App() {
  return (
    <>
      <div className="relative flex flex-col items-center w-screen h-[100vh] gap-10">
        {/* Grid Background */}
        <div className="z-[-1] absolute inset-0 bg-[linear-gradient(black_1px,transparent_1px),linear-gradient(90deg,black_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none"></div>

        {/* UI Content */}
        <div className="z-20 w-[70%] h-[62px] rounded-xl bg-blue-300 mt-4"></div>
        <div className="flex items-center justify-center w-[70%] h-[60%] border-2 border-gray-100 rounded-3xl bg-slate-100 drop-shadow-xl">
          {/* Your FileUpload Component */}
          <FileUpload/>
        </div>
        <ProgressBar/>
      </div>
    </>
  );
}
