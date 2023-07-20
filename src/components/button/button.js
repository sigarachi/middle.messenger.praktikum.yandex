import './style.css';
import Handlebars from "handlebars";

const template = `<button class="button__wrapper">{{text}}</button>`;

export const button = Handlebars.compile(template);
