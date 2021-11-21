import Navbar from "./components/Navbar";
import Meme from "./components/Meme";
import React from "react";


export default function App() {

    const [meme_list, updateMemeList] = React.useState([{
        "id": "438680",
                "name": "Batman Slapping Robin",
                "url": "https://i.imgflip.com/9ehk.jpg",
                "width": 400,
                "height": 387,
                "box_count": 2
    }]);
    const random_meme = meme_list[Math.floor(Math.random()*meme_list.length)];
    const [meme, updateMeme] = React.useState(random_meme);
    const [form_data, updateFormData] = React.useState(() => {
        let f = {};
        for(let i = 0; i < meme.box_count; i++) {
            f = {...f, [`Text ${i+1}`]: ""};
        }
        return f;
    });
    
    React.useEffect(() => {
        console.log('ran useEffect');
        fetch("https://api.imgflip.com/get_memes")
                .then(response => response.json())
                .then(json => updateMemeList(json.data.memes));
    }, []);

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