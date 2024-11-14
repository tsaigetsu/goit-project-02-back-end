export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// export const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

console.log('Email matches:', emailRegexp.test('yomi222e@anypng.com'));
