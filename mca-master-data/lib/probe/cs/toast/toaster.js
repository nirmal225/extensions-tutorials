function raiseToast(occasion){
    iqwerty.toast.toast(occasion, toastOptions);
}
function raiseGreenToast(occasion){
    iqwerty.toast.toast(occasion, greenToastOptions);
}
function raiseRedToast(occasion){
    iqwerty.toast.toast(occasion, redToastOptions);
}

let toastOptions = {
    style: {
        main: {
            background: "#ac68de",
            color: "white",
            "font-size" : "30px",
            "font-weight" : "bold"
        },
    },
};
let redToastOptions = {
    style: {
        main: {
            background: "#f70404",
            color: "white",
            "font-size" : "30px",
            "font-weight" : "bold"
        },
    },
};
let greenToastOptions = {
    style: {
        main: {
            background: "#03b262",
            color: "white",
            "font-size" : "30px",
            "font-weight" : "bold"
        },
    },
};