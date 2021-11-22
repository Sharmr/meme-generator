import Navbar from "./components/Navbar";
import Meme from "./components/Meme";
import React from "react";
import { populateForm } from "./Helper";


export default function App() {


    const [meme_list, updateMemeList] = React.useState([]);
    const [meme, updateMeme] = React.useState({
        "id": "438680",
                "name": "Batman Slapping Robin",
                "url": "https://i.imgflip.com/9ehk.jpg",
                "width": 400,
                "height": 387,
                "box_count": 2
    });
    const [form_data, updateFormData] = React.useState(populateForm({}, meme.box_count));
    

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
                .then(response => response.json())
                .then(json => updateMemeList(json.data.memes));
    }, []);

    React.useEffect(()=>{updateFormData(oldData => {
        return populateForm(oldData, meme.box_count);
    })}, [meme.name]);

    function addNewTextBox() {
        updateMeme((previousMeme) => {
            return {
                ...previousMeme,
                box_count: previousMeme.box_count + 1,
            };
        });
    }

    function removeTextBox() {
        updateMeme((previousMeme) => {
            return {
                ...previousMeme,
                box_count: previousMeme.box_count - 1,
            };
        });
    }

    function handleChange(event) {
        const {value, name} = event.target;
        updateFormData((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        });
    }

    function handleUpload(event) {
        let image=meme.url;
        console.log(image);
        try{
            image = URL.createObjectURL(event.target.files[0]);
        } catch(e) {console.log(e); return;}
        updateMeme((oldMeme)=>{
            return {
                ...oldMeme,
                name: event.target.files[0].name,
                url: image,
            }
        })
    }

    function getMeme() {
        updateMeme(meme_list[Math.floor(Math.random()*meme_list.length)]);
    }

    

    return (
        <>
            <Navbar />
            <Meme 
                box_count={meme.box_count} 
                clickHandler={getMeme}
                url={meme.url}
                width={meme.width}
                height={meme.height}
                form_data={form_data}
                handleChange={handleChange}
                addNewTextBox={addNewTextBox}
                removeTextBox={removeTextBox}
                handleUpload={handleUpload}
            />
        </>
    );
}