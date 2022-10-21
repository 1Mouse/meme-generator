import './meme.css'
import { useState, useEffect } from 'react';

const Meme = () => {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        getMemeImage();
    };

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMeme((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }


    return (
        <>
            <main className='container'>
                <form className='form grid grid--2x2' onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="top text"
                        className='form--input'
                        value={meme.topText}
                        name='topText'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Bottom text"
                        className='form--input'
                        value={meme.bottomText}
                        name='bottomText'
                        onChange={handleChange}
                    />
                    <button
                        type='submit'
                        className="form--button"
                    >
                        Get a new meme image 🖼
                    </button>
                </form>
                <div className="meme">
                    <img
                        src={meme.randomImage}
                        className='meme--image'
                        alt="meme template"
                    />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </main>
        </>
    );
}

export default Meme;


