import React, { useState, useEffect } from "react";
import Imagecard from "./components/Imagecard";
import ImageSearch from "./components/Imagesearch";

function App() {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState(" ");

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="mx-auto">
      <ImageSearch searchText={(text)=>setTerm(text)}/>

      {!isLoading && image.length===0 && <h1 className="text-5xl text-center mx-auto">No Images Found</h1>}
      {isLoading? <h1 className="text-6xl text-center mx-auto">Loading...</h1>:
      <div className="grid grid-cols-3 gap-4">
        {image.map((image) => (
          <Imagecard key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
