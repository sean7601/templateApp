var utils = {};

utils.cleanName = function(name) {
        //remove brackets
        name = name.replace(/[\[\]]/g, '');
        //remove spaces
        name = name.replace(/\s/g, '');
        //remove dashes
        name = name.replace(/-/g, '');
        //remove parentheses
        name = name.replace(/\(/g, '');
        name = name.replace(/\)/g, '');
        //remove periods
        name = name.replace(/\./g, '');
        //remove slashes
        name = name.replace(/\//g, '');
        //remove underscores
        name = name.replace(/_/g, '');
        //remove asterisks
        name = name.replace(/\*/g, '');
        //remove commas
        name = name.replace(/,/g, '');
        //remove colons
        name = name.replace(/:/g, '');
        //remove ampersands
        name = name.replace(/&/g, '');
        //remove question marks
        name = name.replace(/\?/g, '');
        //remove exclamation marks
        name = name.replace(/\!/g, '');
        //remove periods
        name = name.replace(/\./g, '');
        //remove plus signs
        name = name.replace(/\+/g, '');
        //remove forward slashes
        name = name.replace(/\//g, '');
        //remove backslashes
        name = name.replace(/\\/g, '');

        return name
    }


