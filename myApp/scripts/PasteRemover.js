class PasteRemover{
    constructor() {
        const inputElms = document.querySelectorAll('input[type="text"]');
        for (let input of inputElms) {
            this.removePasteRestriction(input)
        }
    }

    removePasteRestriction(element){
        element.addEventListener('paste', function (e) {
            this.value = e.clipboardData.getData('text');
            e.preventDefault();
        });
    }
}

async function run() {
    new PasteRemover();
}

console.log("paste remover")
run().catch(console.log)