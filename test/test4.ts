var a = '- [ f ]'
console.log(a.substring(a.indexOf('[')+1, a.lastIndexOf(']')).trim().toUpperCase())