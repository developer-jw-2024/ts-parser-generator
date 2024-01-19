import  { Greeter, Hi }  from './GreeterUtils'
import { StateSet } from './Utils/StateSet'

function fill(template : string, map : object) : number {
    var value = ''
    for (var i=0;i<template.length;i++) {
        if (template[i]>='0' && template[i]<='9') {
            value += template[i]
        } else {
            value += map[template[i]]
        }
    }
    return parseInt(value)
    // return value
}

function getVariables(...variables : Array<string>) : string {
    var result : string = ''
    variables.forEach(variable=>{
        for (var i=0;i<variable.length;i++) {
            if (variable[i]>='0' && variable[i]<='9') {

            } else if (result.indexOf(variable[i])==-1) {
                result += variable[i]
            }
        }
    })
    return result
}


function work(variables : string, index : number, numbersUsed : Array<boolean>, map : object, a : string, b : string, c : string) {
    if (index==variables.length) {
        if (fill(a, map)*fill(b, map)==fill(c,map)) {
            console.log(fill(a, map)+' * '+fill(b, map)+ ' = '+fill(c,map))
        }
        return
    }
    for (var i=0;i<=9;i++) {
        if (!numbersUsed[i]) {
            map[variables[index]] = i
            numbersUsed[i] = true
            work(variables, index+1, numbersUsed, map, a, b, c)
            numbersUsed[i] = false
            delete map[variables[index]] 
        }
    }
}

var flags : Array<boolean> = []
for (var i=0;i<10;i++) flags[i] = false
work(getVariables("MATH", "MM", "MHBMH"), 0, flags, {}, "MATH", "MM", "MHBMH")
work(getVariables("ABC", "A", "3DD2"), 0, flags, {}, "ABC", "A", "3DD2")
work(getVariables("B0A", "BA", "A1BA"), 0, flags, {}, "B0A", "BA", "A1BA")
