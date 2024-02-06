const BLOOD_GROUP_REGEX = /^(A|B|AB|O)[+\-]$/;
const TEXT_REGEX = {
    TEXT_WITH_SPACE_25 : /^[a-zA-Z ]{1,25}$/,
    TEXT_WITH_SPACE_5 : /^[a-zA-Z ]{1,5}$/,
    TEXT_WITH_SPACE_50 : /^[a-zA-Z ]{1,50}$/,
    TEXT_WITH_ALL : /^[a-zA-Z0-9\s!@#$%^&*()-_+=,.<>/?;:'"[\]{}|`~]*$/,
    MOBILE_NO : /^(\+91-|\+91|0)?[6-9]\d{9}$/
}

export { BLOOD_GROUP_REGEX, TEXT_REGEX };