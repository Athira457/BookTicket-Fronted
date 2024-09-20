
import UserPage from "./Users/page";
export default function Home() {
  return (
    <>
      <div className="container" style={{ display: 'flex'}}>
        <div className="sidebar">
          < UserPage/>
        </div>

      </div>
    </>
  );
} 
