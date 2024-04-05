import SimpleSnackbar, {useSetInitialStateSnackbar, openTheSnackBar} from './Components/MUI/SimpleSnackBar';


import './App.css';
import './Assests/fontAwesomeProIcons/fontAwesomeIcons.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useEffect, useReducer } from 'react';
import { useRef } from 'react';
function App() {
  let refTextAreaInput = useRef(null);
  const [open, setOpen] = useSetInitialStateSnackbar();

  async function copyTextToClipboard(){
    await navigator.clipboard.writeText(stateTextUtilsWebApp.data); 
    openTheSnackBar(setOpen);
  }
  function reducer(state, action){
    function computeNoOfWords(text){
      return text.trim().split(/\s+/).length; // on or many spaces then split
    }
    function computeNoOfChars(text){
      return text.length;
    }
    function computeReadingTime(numOfWords){
      let averageReadingSpeed= 200; // words per minutes
      return Math.ceil(numOfWords/averageReadingSpeed);
    }

    // console.log('hi');
    // return state;
    let newData=null;
    let temp = {
      noOfWords: 0,
      noOfChars: 0,
      readingTime: 0
    }
    switch (action.type){
        
      case 'clearText':      
        // console.log('clearing')
        refTextAreaInput.current.value="";
        return setInitialState();
        
        
      case 'removeExtraSpaces':
        // console.log('hi there, convert to uppercase');
        newData = state.data.trim(); // starting and ending spaces
        newData = newData.replace(/\s+/g, ' '); // spaces in middle if any using reg exr
        refTextAreaInput.current.value = newData;
        return {
          ...state, 
          data: newData
        }              
      case 'convertToLowerCase':
        // console.log('hi there, convert to uppercase');
        newData = state.data.toLowerCase();
        refTextAreaInput.current.value = newData;
        return {
          ...state, 
          data: newData
        }              
      case 'convertToUpperCase':
        // console.log('hi there, convert to uppercase');
        newData = state.data.toUpperCase();
        refTextAreaInput.current.value = newData;
        return {
          ...state, 
          data: newData
        }              
      case 'updateData':
        // console.log(state, action.payload)      
        // console.log('reucer saying hi!');     
        temp.noOfWords = computeNoOfWords(action.payload);   
        temp.noOfChars = computeNoOfChars(action.payload);
        temp.readingTime = computeReadingTime(temp.noOfWords);        
        return {
          ...state, 
          data: action.payload,
          noOfWords:  temp.noOfWords,
          noOfChars: temp.noOfChars,
          readingTime: temp.readingTime 
        }
      default:
      return state;
    }
    
  }
  function setInitialState(){
    return {
      data: "",
      noOfWords: 0,
      noOfChars: 0,
      readingTime: 0
    };
  }

  let [stateTextUtilsWebApp, dispatch] = useReducer(reducer, setInitialState());
  // useEffect(()=>{console.log(stateTextUtilsWebApp)}, [stateTextUtilsWebApp]);


  return (
    <div id='wrapperHomePage' className='mt-[.5rem] pt-[1rem] p-[2rem] w-[70rem]  m-auto rounded-md  text-[1.2rem] text-slate-200'>
      
      <Header />
      <SimpleSnackbar open={open} setOpen={setOpen}/>
      

      <div id='wrapperSectionsDocumentAndPreviewDocument' className="flex gap-[1rem] p-[1rem]">
        <section className="w-[50%] ">
          <h2 className="font-medium  p-[1rem] pl-[0] text-[1.5rem]" >Yours Document</h2>
          <textarea ref={refTextAreaInput} placeholder='Enter Yours Text Here...' onChange={(e)=>dispatch({type: "updateData", payload:e.target.value})} cols="30" rows="10" className="w-[100%]  text-slate-900 transition focus:outline focus:outline-2 focus:outline-yellow-500 p-[1rem] rounded-md bg-stone-200"></textarea>
          <div  id='btnsGrid' className="grid grid-cols-3 gap-[.5rem]">
            <button onClick={(e)=>dispatch({type: "convertToUpperCase", payload:null})}  className="select-none wrapperGeneratePassword  flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50  hover:bg-yellow-400 transition cursor-pointer px-[1rem] py-[.5rem] rounded-md  text-slate-900    text-[2rem]  bg-yellow-300 hover:text-white">
              <span className="text-[1rem] font-semibold">
                Convert UPPERCASE
              </span>
            </button>

            <button onClick={(e)=>dispatch({type: "convertToLowerCase", payload:null})} className="select-none wrapperGeneratePassword  flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50  hover:bg-yellow-400 transition cursor-pointer px-[1rem] py-[.5rem] rounded-md hover:text-white text-slate-900    text-[2rem]  bg-yellow-300 ">        
              <span className="text-[1rem] font-semibold">
                Convert lowercase
              </span>
            </button>
            <button onClick={(e)=>dispatch({type: "removeExtraSpaces", payload:null})}  className="select-none wrapperGeneratePassword flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50  hover:bg-yellow-400 transition cursor-pointer px-[1rem] py-[.5rem] rounded-md hover:text-white text-slate-900    text-[2rem]  bg-yellow-300 ">                    
              <span className="text-[1rem] font-semibold">
              Remove Extra Spaces
              </span>
            </button>

            <button onClick={(e)=>dispatch({type: "clearText", payload:null})}  className="select-none wrapperGeneratePassword flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50  hover:bg-yellow-400 transition cursor-pointer px-[1rem] py-[.5rem] rounded-md hover:text-white text-slate-900    text-[2rem]  bg-yellow-300 ">        
              <i className="fa-sharp fa-solid fa-rotate-right"></i>
              <span className="text-[1rem] font-semibold">
                Clear Text
              </span>
            </button>

            <button onClick={copyTextToClipboard} className="select-none wrapperGeneratePassword flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50  hover:bg-yellow-400 transition cursor-pointer px-[1rem] py-[.5rem] rounded-md hover:text-white text-slate-900    text-[2rem]  bg-yellow-300 ">        
            <i title="Copy Yours Password" className="cursor-pointer fa-sharp fa-solid fa-copy "></i>
              <span className="text-[1rem] font-semibold">
                Copy Text
              </span>
            </button>


          </div>

          
        </section>
        <section className="w-[50%]">
          <h2 className="font-medium  p-[1rem] pl-[0] text-[1.5rem]">Document Preview</h2>
          <textarea value={stateTextUtilsWebApp?.data} cols="30" rows="10" readOnly={true} className="w-[100%]  text-slate-900 transition focus:outline focus:outline-2 focus:outline-yellow-500 p-[1rem] rounded-md bg-stone-300" placeholder="Yours text Document Preview shall be shown here!"></textarea>

            <div className="p-[1rem] pt-[0]">
            <h2 className="font-medium  p-[1rem] pt-[0] pl-[0] text-[1.5rem] text-stone-300">Summary of Yours Text</h2>
            <dl id='summaryGrid' className="grid grid-cols-3 gap-[1rem]">
              <div className="text-stone-300 italic">
                <dt className='font-semibold'>Number of Words:</dt>
                <dd>{stateTextUtilsWebApp.noOfWords}</dd>
              </div>
              <div className="text-stone-300 italic">
                <dt className='font-semibold'>Number of Characters: </dt>
                <dd>{stateTextUtilsWebApp.noOfChars}</dd>
              </div>
              <div className="text-stone-300 italic">
                <dt className='font-semibold'>Reading Time*: </dt>
                <dd >{stateTextUtilsWebApp.readingTime<=1 ? "less than " : ""} {stateTextUtilsWebApp.readingTime} minute{stateTextUtilsWebApp.readingTime>1 ? "s" : ""}</dd>                
              </div>
            </dl>            
              <span className='text-[.9rem] italic text-blue-300'>* Assuming average reading speed of 200 words per minute.</span>
          </div>
        </section>
      </div>      
      <Footer/>
    </div>

  );
}

export default App;
