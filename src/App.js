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

    function newText(event) {
        const {value, name} = event.target;
        console.log(event.target);
        updateFormData((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        });
        console.log(form_data);
    }

    function getMeme() {
        updateMeme(data.data.memes[Math.floor(Math.random()*data.data.memes.length)]);
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
                newText={newText}
            />
        </>
    );
}