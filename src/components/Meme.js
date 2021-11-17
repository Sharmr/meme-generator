export default function Meme() {
    return (
        <div className="meme">
            <Form />
            <Image />
        </div>
    );
}

function Form() {
    return (
            <form className="form">
                <input type='text' className='text-field' id="text-field-top" defaultValue='Top Text'></input>
                <input type='text' className='text-field' id="text-field-bottom" defaultValue='Bottom Text'></input>
                <input type='submit' id='submit-button' value='Generate Meme'></input>
            </form>
    );
}

function Image() {
    return (
        <div className="image">

        </div>
    );
}