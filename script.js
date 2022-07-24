// settings:
const languages = [
    {
        name: 'Deutsch',
        langCode: 'de-DE',
    },
    {
        name: 'English',
        langCode: 'en-GB',
    },
    {
        name: 'English',
        langCode: 'en-US'
    },
    {
        name: 'Español',
        langCode: 'es-ES',
    },
    {
        name: 'Français',
        langCode: 'fr-FR',
    },
    {
        name: 'Italiano',
        langCode: 'it-IT',
    },
    {
        name: 'Lietuvių',
        langCode: 'lt-LT',
    },
    {
        name: 'Nederlands',
        langCode: 'nl-NL',
    },
    {
        name: 'Polski',
        langCode: 'pl-PL',
    },
    {
        name: 'Português',
        langCode: 'pt-PT',
    },
    {
        name: 'Türkçe',
        langCode: 'tr-TR',
    },
    {
        name: 'Русский',
        langCode: 'ru-RU',
    },
    {
        name: 'Українська',
        langCode: 'uk-UA',
    },
];

document.addEventListener('DOMContentLoaded', createLanguageToggle)
document.querySelectorAll('input').forEach(el => el.addEventListener('change', console.log));

function checkFlag(code) {
    return fetch('https://countryflagsapi.com/png/' + code)
    .then(r => r.blob())
    .then(blob => URL.createObjectURL(blob))
}

function createLanguageToggle() {
    languages.forEach(async lang => {
        const flagURL = await checkFlag(parseCountryCode(lang.langCode))
                        .then(url => url);

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'languageToggle'
        input.value = lang.langCode;
        input.id = lang.langCode;
        input.classList.add('input_lang')

        const label = document.createElement('label');
        label.htmlFor = lang.langCode;
        label.textContent = lang.name.toUpperCase();
        // label.innerHTML = `<span class="label_text">${lang.name}</span>`;
        label.style.backgroundImage = `url(${flagURL})`
        label.classList.add('label_lang')

        document.getElementById('buttons').append(input);
        document.getElementById('buttons').append(label);
    });
}

function parseCountryCode(code) {
    return code.match(/[A-Z]{2}/g)[0]
}

// DOM elements:

// const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);
// recognition.lang = supportedLanguages[6];
// console.log(recognition)


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const text = document.getElementById('text');
//     console.log(text.value);
//     const utterance = new SpeechSynthesisUtterance(text.value);
//     speechSynthesis.speak(utterance);
// })