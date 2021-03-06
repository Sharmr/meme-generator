import React, {useCallback, useRef} from 'react';
import {toPng, toJpeg} from 'html-to-image';
import Draggable from 'react-draggable';


export default function Meme(props) {
    const ref = useRef(null);
    const onButtonClickPNG= useCallback(() => {
        if(ref.current === null) {
            return;
        }
        toPng(ref.current, {cacheBust:true}).then((dataURL) => {
            const link = document.createElement('a');
            link.download = 'meme.png';
            link.href = dataURL;
            link.click()
        }).catch((err) => {console.log(err)})
    },[ref]);
    const onButtonClickJpeg= useCallback(() => {
        if(ref.current === null) {
            return;
        }
        toJpeg(ref.current, {cacheBust:true}).then((dataURL) => {
            const link = document.createElement('a');
            link.download = 'meme.jpeg';
            link.href = dataURL;
            link.click()
        }).catch((err) => {console.log(err)})
    },[ref]);
    return (
        <div className="meme">
            <Form 
                box_count={props.box_count} 
                form_data={props.form_data} 
                clickHandler={props.clickHandler} 
                handleChange={props.handleChange}
                addNewTextBox={props.addNewTextBox}
                removeTextBox={props.removeTextBox}
                handleUpload={props.handleUpload}/>
            
            <div className="image" ref={ref}>
            <Image 
                url={props.url} 
                width={props.width} 
                height={props.height} 
                form_data={props.form_data} 
                box_count={props.box_count}
            /></div>
            
            <p>(You can drag around the text and place it as you like on the image)</p>
            <button className="download-button" onClick={onButtonClickPNG}> download as PNG</button>
            <button className="download-button" onClick={onButtonClickJpeg}> download as JPEG</button>
            
        </div>
    );
}


function Form({box_count, form_data, clickHandler, handleChange, addNewTextBox,removeTextBox, handleUpload}) {
    function getTextBoxes({box_count, handleChange}) {
        let b = [];
        for(let i = 1; i <= box_count; i++) {
            b.push(<TextBox box_number={i} text={form_data[`Text ${i}`]} handleChange={handleChange} key={i}/>);
        }
        return b;
    }
    const boxes = getTextBoxes({box_count, handleChange});
    return (
            <div className="form">
                {boxes}
                <button className="more-boxes" onClick={addNewTextBox}>Add a Box</button>
                <button className="more-boxes" onClick={removeTextBox}>Remove a Box</button>
                <input 
                    type='submit' 
                    id='submit-button' 
                    value='New Random Meme'
                    onClick = {clickHandler}
                />
                <div className='upload'>
                    <p>Or upload your own image</p>
                    <input 
                        type='file'
                        accept='image/png image/jpeg image/jpg'
                        id='upload-button'
                        onChange = {handleUpload}
                    />
                </div>
            </div>
    );
}

function TextBox({box_number, text, handleChange}) {
    return (
        <input 
            type='text' 
            className='text-field' 
            name={`Text ${box_number}`}
            onChange={handleChange}
            value={text}
         />
    );
}

function Image(meme) {
    let meme_text_list = MemeText(meme.form_data, meme.box_count);
    return (
        <>
            <img src={meme.url} alt='meme'></img>
            {meme_text_list}
        </>
    );
}

function MemeText(form_data, box_count) {
    let meme_text_list = [];
    for(let i=0; i < box_count; i++) {
        meme_text_list.push(
            <Draggable 
                bounds="parent" 
                defaultPosition={{x:0, y: i*100}}
                key={i}>
                    <h2 key={i} className='meme-text'>
                        {form_data[`Text ${i+1}`]}
                    </h2>
            </Draggable>);
    }
    return meme_text_list;
}