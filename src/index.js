import axios from "axios";
import Notiflix from 'notiflix';
// console.log(Notiflix);

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');

// Your API key: 32979410-6576ce951400b06dd5e7c6a2c
// ex: https://pixabay.com/api/?key=32979410-6576ce951400b06dd5e7c6a2c&q=yellow+flowers&image_type=photo

async function foo() {
    const response = await axios.get('https://pixabay.com/api/')
}