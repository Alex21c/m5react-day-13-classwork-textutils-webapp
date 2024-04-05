import { Link } from "react-router-dom";
import Navbar from "./Navbar";
export default function Header(){
  return (
    <header className="flex flex-col gap-[1rem] ">
      <Navbar/>
      <h2  className='appTitle text-blue-300 text-[2.5rem] font-semibold smallCaps flex flex-col gap-[0rem]  text-center'>
        <span>TextUtils WebApp</span>      
        <span className="text-[1.5rem] font-normal italic">( <a href="https://geekster.in/" className="underline hover:text-yellow-300 transition">Geekster</a> Module#5 React Day #13 Classwork :)</span>
      </h2>      
    </header>
  );
}