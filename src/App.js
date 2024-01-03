import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
// import imageToBase64 from 'image-to-base64/browser';

// import { imagefrombuffer } from 'imagefrombuffer'



function App() {
  const [userName, setUserName] = useState({
    name: "",
    image: "",
  })
  const [items, setItems] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      await axios.get('http://localhost:5000/api').then(async (response) => {
        console.log('Axios get Success')
        await setItems(response.data)
        // console.log('items is : ', items);

      }).catch(err => console.log(err))
    }
    fetchData()

  }, [])

  // Fetch data when the component mounts
  const handleSubmit = async (e) => {
    e.preventDefault()

    // const add = {
    //   name: userName.name,
    //   image: userName.image
    // };
    console.log("username", userName);

    await axios.post('http://localhost:5000/api/post',
      userName
    ).then((response) => { console.log(response) }).catch(err => console.log(err))


  }
  //   function base64ToBrowser(buffer) {
  //     return window.btoa([].slice.call(new Uint8Array(buffer)).map(function(bin) { return String.fromCharCode(bin); }).join(''));
  // }
  const handleimageChange = (e) => {
    console.log("imagetest", e.target.files);
    convertBase64(e.target.files[0])
  }

  function convertBase64(file, type) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        // console.log(fileReader.result);

        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
      .then(files => {
        console.log(files);
        userName.image = files
      })

  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name='users'
          value={userName.name}
          onChange={(e) => { setUserName({ name: e.target.value }) }} />
        <input
          type="file"
          name='imgFile'
          accept=".jpg,.png,.jpeg"
          id="imgFile"
          onChange={handleimageChange} />
        <button className='btn btn-primary'>
          Submit
        </button>
      </form>
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {items && items.map((item, index) => {
            // const i = item.image.data;
            return (<li key={index}>{JSON.stringify(index)}. {item?.name} <img src={item?.image} alt="no Img" /> </li>)
          }

          )}
        </ul>

      </div>
    </div>
  );
}

export default App;
