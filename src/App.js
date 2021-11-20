import Navbar from "./components/Navbar";
import Meme from "./components/Meme";
import data from "./memesData";
import React from "react";

export default function App() {

    const random_meme = data.data.memes[Math.floor(Math.random()*data.data.memes.length)];
    const [meme, updateMeme] = React.useState(random_meme);
    const [form_data, updateFormData] = React.useState(() => {
        let f = {};
        for(let i = 0; i < meme.box_count; i++) {
            f = {...f, [`Text ${i+1}`]: ""};
        }
        return f;
    });

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

    function newText(event) {
        const {value, name} = event.target;
        updateFormData((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        });
        console.log(form_data);
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
        updateMeme(data.data.memes[Math.floor(Math.random()*data.data.memes.length)]);
    }

    React.useEffect(()=>{updateFormData(oldData => {
        let f = {};
        for(let i = 0; i < meme.box_count; i++) {
            f = {...f, [`Text ${i+1}`]: ""};
        }
        return f;
    })}, [meme.name]);

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
                newText={newText}
                addNewTextBox={addNewTextBox}
                removeTextBox={removeTextBox}
                handleUpload={handleUpload}
            />
        </>
    );
}