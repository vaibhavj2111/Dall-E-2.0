import React, {useState, useCallback, useEffect} from "react";
import{ Loader, FormField, Card} from "../components"

const RenderCards = ({data, title}) =>{
  if(data.length>0){
    return data.map((post)=> <Card key={post._id}{...post}/>)
  }

  return(<h2 className="mt-5 text-[#6449ff] text-xl uppercase">
    {title};
  </h2>)
}

export default function Home() {

  const[allPosts, setAllPosts] = useState(false);
  const [loading, setLoading]=useState(false);
  const [searchText,setSearchText]= useState(false);


  return (
    <section className="max-w-7xl mx- auto">
      <div>
        <h1 className="font-extrabold text-#[222328] text-[32px]">
          Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px] ">Browse thorugh Imaginitive and Visual Images generated by DALL-E AI</p>
      </div>

      <div className="mt-16">
        <FormField/>
      </div>

      {/* the below div is checking if loading is happening thorugh the state created earlier. if it does, it returns the loader component, once loaded, it returns the image */} 

      {/* THE MOST IMPORTANT LOGIC BELOW, SEE THOROUGHLY */}

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader/>
          </div>
        ) : (
          <>
          {searchText && (
            <h2 className="text-[#666e75] font-medium text-xl mb-3"> Showing Results for <span className="text-[#222328]">{searchText}
            </span>
            </h2>
            )}
            <div className="grid lg:grid-col-4 sm:grid-col-3 xs:grid-col-2 grid-col-1 gap-3">
              {searchText?(
                <RenderCards
                  data= {[]}
                  title= "No searchresults found" 
                />
              ):(
                <RenderCards
                  data= {[]}
                  title= "NO POSTS FOUND"
                />
              )}
            </div>
          </>
        )}
      </div>

    </section>
  )
}