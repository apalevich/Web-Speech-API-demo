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

// DOM-elements

const launchReadingButton = document.getElementById('read');
const text = document.getElementById('text');

// initializaion

document.addEventListener('DOMContentLoaded', createLanguageToggle)

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
        input.addEventListener('change', getCurLang); //for testing

        const label = document.createElement('label');
        label.htmlFor = lang.langCode;
        label.textContent = lang.name.toUpperCase();
        label.style.backgroundImage = `url(${flagURL})`
        label.classList.add('label_lang')

        document.getElementById('buttons').append(input);
        document.getElementById('buttons').append(label);
    });
}

function checkFlag(code) {
    return fetch('https://countryflagsapi.com/png/' + code)
    .then(r => r.blob())
    .then(blob => URL.createObjectURL(blob))
}

function parseCountryCode(code) {
    return code.match(/[A-Z]{2}/g)[0]
}

function getCurLang(e) {
    return document.querySelector('input[name="languageToggle"]:checked').value
}

// Recognition:

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);
recognition.lang = getCurLang();
console.log(recognition)

// Speech:

launchReadingButton.addEventListener('click', (e) => {
    const utterance = new SpeechSynthesisUtterance(text.value);
    utterance.lang = getCurLang();

    console.log(`Speeching: ${text.value} in ${utterance.lang} language`);

    speechSynthesis.speak(utterance);
})