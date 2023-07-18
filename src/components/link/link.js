import './style.css';
import Handlebars from "handlebars";

const template = `<a class="app__link" href={{url}}>{{text}}</a>`

export const link = Handlebars.compile(template);
