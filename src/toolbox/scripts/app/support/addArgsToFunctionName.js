'use strict';

module.exports = (functionName, ...functionArgs) => {
    if(typeof functionName !== 'string') {
        return;
    }

    functionArgs = functionArgs.join(', ');
    functionName = functionName.replace(/\(\s*\)/g, `(${functionArgs})`);

    return functionName;
};
