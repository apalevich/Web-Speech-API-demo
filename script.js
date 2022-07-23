const form = document.getElementById('form');


console.log(form)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('text');
    console.log(text.value);
    const utterance = new SpeechSynthesisUtterance(text.value);
    speechSynthesis.speak(utterance);
})