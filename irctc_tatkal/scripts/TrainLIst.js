class TrainLIst{


    async startSearch(trainNumber) {
        let trainListNO = this.getTrainListNo(trainNumber);
    }

    getTrainListNo(trainNumber) {
        let trainHeadingElems = document.querySelector('col-sm-5 col-xs-11 train-heading');
        for(let trainListINdex=0;trainListINdex <trainHeadingElems.length;trainListINdex++ ){
            if(trainHeadingElems[trainListINdex].text.includes(trainNumber)){
                return trainListINdex+1
            }
        }
    }
}

async function run() {
    let trainList = new TrainLIst();
    await trainList.startSearch(
        "12864"
    )
}

async function pause(millisecs){
    await new Promise(r => setTimeout(r, millisecs));
}

run().catch(console.log)