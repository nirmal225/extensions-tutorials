const path = './modular.mjs';

import(path).then((mod) => {
        // Now you can use mod like a regular CommonJS module
        mod.greet("john");
}).catch((error) => {
        console.error('Error importing module:', error);
});
