import { Link } from "react-router-dom";
export default function Footer(){
  return (
    <footer className="bg-yellow-200 p-[1rem] rounded-bl-md rounded-br-md flex gap-[1rem] justify-center text-slate-900">
      <p className="text-[1.2rem] flex gap-[.5rem]" >
        <span>&copy; 2024</span>
        <Link to="https://www.linkedin.com/in/alex21c/" className='underline hover:text-white transition  font-medium'>Alex21C</Link>  
        <span>All Rights Reserved.</span>
      </p>              
    </footer>
  );
}