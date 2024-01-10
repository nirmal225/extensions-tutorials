class ServiceController {
    // async processMessage(m) {
    //     let resp = null;
    //     console.log("m.message : "+m.message)
    //     switch (m.message) {
    //         case "getCinToProcure":
    //             resp = new ProcureStateMgt_V3().getCinToProcure();
    //             break;
    //         case "completeProcurementTask":
    //             resp = await new ProcureStateMgt_V3().completeProcurementTask(m.procuredCompanies);
    //             break;
    //         case "getCompToDownload":
    //             resp= new DownloadStateMgt_V3().getCompToDownload();
    //             break;
    //         case "scrapedDocList":
    //             resp = await new DownloadStateMgt_V3().setScrapedDocData(m.docList);
    //             break;
    //         case "getCategoryToDownload":
    //             resp = new DownloadStateMgt_V3().getCategoryToDownload();
    //             break;
    //         default:
    //             console.log("UNSUPPORTED_MESSAGE");
    //             console.log(JSON.stringify(m));
    //             break;
    //     }
    //     return resp;
    // }
}
serviceController = new ServiceController()